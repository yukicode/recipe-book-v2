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
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.auth.signInUser(this.userForm.value).then(
      user => this.successRedirect(),
      error => this.displayError(error)
    );
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
}
