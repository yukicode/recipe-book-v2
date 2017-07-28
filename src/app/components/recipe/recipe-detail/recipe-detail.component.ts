import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

import { Recipe } from "../../../models/recipe";
import { Ingredient } from "../../../models/ingredient";
import { ShoppingListService } from '../../../services/shopping-list.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  hasSelectedRecipe: boolean;
  selectedRecipe: Recipe;
  selectedIngredients: boolean[] = [];
  mainImagePath: string = "http://placehold.it/1024x300";

  constructor(
    private shoppingListService: ShoppingListService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .switchMap((params: ParamMap) => this.dataService.getSelectedRecipe(params['id']))
      .subscribe(recipe => {
        this.selectedIngredients = [];
        if (!recipe) {
          this.hasSelectedRecipe = false;
          this.router.navigate(["/recipe"]);
          return;
        }
        this.hasSelectedRecipe = true;
        this.selectedRecipe = recipe;
        this.mainImagePath = this.selectedRecipe.imagePaths && this.selectedRecipe.imagePaths[0] ? this.selectedRecipe.imagePaths[0] : "http://placehold.it/1024x300";
      });
  }

  addAllToList(): void {
    if (!this.selectedRecipe) { return; }
    this.shoppingListService.addToList(this.selectedRecipe.ingredients, this.selectedRecipe.title);
  }

  addSelectedToList(): void {
    var length = this.selectedRecipe.ingredients.length;
    var temp = [];
    for(var i=0; i<length; i++){
      if(this.selectedIngredients[i]){
        temp.push(this.selectedRecipe.ingredients[i]);
      }
    }
    this.shoppingListService.addToList(temp, this.selectedRecipe.title);
  }

  toggleSelect(i: number): void {
    if(this.selectedIngredients[i] == undefined){
      this.selectedIngredients[i] = true;
    }else {
      this.selectedIngredients[i] = !this.selectedIngredients[i];
    }
  }
}
