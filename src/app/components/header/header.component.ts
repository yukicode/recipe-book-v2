import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string = "User";
  user: any;
  wait_1 : any;
  private showcollapsed: boolean = false;

  constructor(
    private auth: AuthService
  ){}

  ngOnInit() {
    if(this.userName === "User"){
      this.wait_1 = setTimeout(() => this.isAuth(), 500);
    }
  }

  ngOnDestroy() {
    if(this.wait_1) {clearTimeout(this.wait_1);}
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

  toggleCollapsed() {
    this.showcollapsed = !this.showcollapsed;
  }
}
