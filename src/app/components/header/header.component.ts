import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('itemCountState', [
      state('inactive', style({transform: 'scale(1)'})),
      state('active', style({transform: 'scale(3)'})),
      transition('inactive => active', animate('200ms ease-out')),
      transition('active => inactive', animate('200ms ease-in')),
    ])
  ]
})
export class HeaderComponent implements OnInit {

  userName: string = "User";
  user: any;
  private _timer_1 : any;
  private _timer_2 : any;
  private showcollapsed: boolean = false;
  private itemCount: number = 0;
  private triggerItemCount: string = 'inactive';

  constructor(
    private auth: AuthService,
    private shoppingService: ShoppingListService
  ){}

  ngOnInit() {
    if(this.userName === "User"){
      this._timer_1 = setTimeout(() => this.isAuth(), 500);
    }
    this.shoppingService.getItemCount().subscribe((count)=>{
      this.itemCount = count;
      this.activateItemCount();
    });
  }

  ngOnDestroy() {
    if(this._timer_1) {clearTimeout(this._timer_1);}
    if(this._timer_2) {clearTimeout(this._timer_2);}
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

  activateItemCount() {
    this.triggerItemCount = 'active';
    this._timer_2 = setTimeout(()=>this.triggerItemCount='inactive', 200);
  }
}
