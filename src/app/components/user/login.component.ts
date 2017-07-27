import { Component, OnInit, OnDestroy } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private userForm: FormGroup;
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

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', Validators.compose([
                    Validators.required,
                    this.isEmail])],
      'password': ['', [Validators.required]]
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

    this.auth.signInUser(this.userForm.value).then(
      user => this.successRedirect(),
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
    'email': '',
    'password': ''
  };

  errorMessages = {
    'email': {
      'required': 'Email is required',
      'noEmail': 'The format of the email is invalid.'
    },
    'password': {
      'required': 'Password is required.'
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
    this._timer_2 = setTimeout(() => {
      this._stateboxconfig.show = false;
    }, 4000);
  }

  successRedirect() {
    var successConfig = {
      title: "Redirecting",
      content: "",
      updating: true,
      show: true
    }

    this._stateboxconfig = successConfig;
    this._timer_1 = setTimeout(() => this.router.navigate(['/recipe']), 1500);
  }

  isEmail(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return { noEmail: true };
    }
  }
}
