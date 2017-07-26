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
  userForm: FormGroup;
  stateboxconfig: any = {};
  wait_1: any;
  wait_2: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    if(this.wait_1) {clearTimeout(this.wait_1);}
    if(this.wait_2) {clearTimeout(this.wait_2);}
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
      error => {
        this.stateboxconfig.title = "Error";
        this.stateboxconfig.content = error.message;
        this.wait_2 = setTimeout(() => {
          this.toggleLoadingState();
        }
          , 3000);
      }
    );
  }

  toggleLoadingState() {
    this.stateboxconfig.show = !this.stateboxconfig.show;
  }

  successRedirect() {
    this.stateboxconfig.display = "Redirecting";
    this.wait_1 = setTimeout(() => this.router.navigate(['/recipe']), 1500);
  }
}
