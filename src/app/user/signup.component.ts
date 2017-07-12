import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.interface';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('loadingState', [
      state('flyIn', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('0.4s linear')
      ]),
      transition('* => void', [
        animate('0.4s 10 ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})

export class SignupComponent implements OnInit {
  userForm: FormGroup;
  loadingState: boolean = false;
  loadingMessage: string = "Loading";
  wait_1: any;
  wait_2: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.resetSignUp();
    this.buildForm();
  }

  ngOnDestroy() {
    if(this.wait_1) {clearTimeout(this.wait_1);}
    if(this.wait_2) {clearTimeout(this.wait_2);}
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', Validators.compose([
        Validators.required,
        this.isEmail])],
      password: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)]],
      confirmPassword: ['', Validators.compose([
        Validators.required,
        this.isEqualPassword.bind(this)])]
    });

    this.userForm.valueChanges.subscribe(
      data => this.checkFormErrors(data)
    );

    this.checkFormErrors();
  }

  checkFormErrors(data?: any): void {
    if (!this.userForm) { return; }
    var form = this.userForm;
    for (var key in this.formErrors) {
      this.formErrors[key] = '';
      var control = form.get(key);

      if (control && control.dirty && !control.valid) {
        for (var err in control.errors) {
          this.formErrors[key] += this.errorMessages[key][err] + '\n';
        }
      }
    }
  }

  formErrors = {
    'name': '',
    'email': '',
    'password': '',
    'confirmPassword': ''
  };

  errorMessages = {
    'name': {
      'required': 'Name is required.'
    },
    'email': {
      'required': 'Email is required',
      'noEmail': 'The format of the email is invalid.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 6 characters long.',
      'maxlength': 'Password must be less than 20 characters long.',
    },
    'confirmPassword': {
      'required': 'Confirming password is required.',
      'passwordsNotMatch': 'The passwords are not the same.'
    }
  }

  isEmail(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return { noEmail: true };
    }
  }

  isEqualPassword(control: FormControl): { [s: string]: boolean } {
    if (!this.userForm) {
      return { passwordsNotMatch: true };

    }
    if (control.value !== this.userForm.controls['password'].value) {
      return { passwordsNotMatch: true };
    }
  }

  toggleLoadingState() {
    this.loadingState = !this.loadingState;
  }

  onSubmit() {
    this.auth.signupUser(this.userForm.value).then(
      fuser => {
        this.auth.updateProfile(this.userForm.value).then(
          () => this.successRedirect()
        );
      },
      error => {
        this.loadingMessage = error.message;
        this.wait_1 = setTimeout(()=> {
          this.toggleLoadingState();
          this.loadingMessage = "Loading";
        }
        , 2000);
      }
    );
  }

  successRedirect() {
    this.loadingMessage = "Redirecting";
    this.wait_2 = setTimeout(() => this.router.navigate(['/recipe']), 1500);
  }

  resetSignUp(): void {
    this.userForm = null;
    this.loadingState = false;
    this.loadingMessage = "Loading";
  }
}
