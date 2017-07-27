import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit {
  userForm: FormGroup;
  private _stateboxconfig: any = {};
  private _timer_1: any;
  private _timer_2: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    if(this._timer_1) {clearTimeout(this._timer_1);}
    if(this._timer_2) {clearTimeout(this._timer_2);}
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

  onSubmit() {
    var submittingConfig = {
      title: "Loading...",
      updating: true,
      show: true
    };

    this._stateboxconfig = submittingConfig;

    this.auth.signupUser(this.userForm.value).then(
      fuser => {
        this.auth.updateProfile(this.userForm.value)
          .then(() => this.successRedirect());
      },
      error => this.displayError(error)
    );
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

  displayError(error) {
    var errorConfig = {
      title: "Error",
      content: error.message,
      updating: false,
      show: true
    };

    this._stateboxconfig = errorConfig;
    this._timer_1 = setTimeout(()=> {
      this._stateboxconfig.show = false;
    }, 2000);
  }

  successRedirect() {
    var successConfig = {
      title: "Redirecting...",
      content: "",
      updating: true,
      show: true
    }
    
    this._stateboxconfig = successConfig;
    this._timer_2 = setTimeout(() => this.router.navigate(['/recipe']), 1500);
  }
}
