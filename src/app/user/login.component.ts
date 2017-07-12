import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../user.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent implements OnInit {
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
        this.loadingMessage = error.message;
        this.wait_2 = setTimeout(() => {
          this.toggleLoadingState();
          this.loadingMessage = "Loading";
        }
          , 2000);
      }
    );
  }

  toggleLoadingState() {
    this.loadingState = !this.loadingState;
  }

  successRedirect() {
    this.loadingMessage = "Redirecting";
    this.wait_1 = setTimeout(() => this.router.navigate(['/recipe']), 1500);
  }
}
