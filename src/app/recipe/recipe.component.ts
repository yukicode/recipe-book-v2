import { Component } from '@angular/core';
import {Recipe} from "../recipe";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent{
  isShown: boolean = false;
  constructor() { }

  toggleMenu(){
    this.isShown = !this.isShown;
    console.log(this.isShown);
  }
}
