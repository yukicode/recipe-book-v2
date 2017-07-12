import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string = "User";
  user: any;
  constructor(
    private auth: AuthService
  ){}

  ngOnInit() {
    if(this.userName === "User"){
      setTimeout(() => this.isAuth(), 500);
    }
  }

  isAuth(): boolean{
    var isAuth = this.auth.isAuthenticated();
    if(isAuth){
      this.userName = this.auth.getUser().displayName;
    }else{
      this.userName = "User";
    }
    return isAuth;
  }

  signOut(){
    this.auth.signOutUser();
    this.userName = "User";
  }
}
