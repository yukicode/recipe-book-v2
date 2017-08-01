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
  selectedIngredientsCount: number = 0;
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
        this.selectedIngredientsCount = 0;
        
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
    let length = this.selectedRecipe.ingredients.length;
    if (!this.selectedRecipe || length == 0) { return; }
    for(var i=0; i< length; i++)
    {
      this.selectedRecipe.ingredients[i].selected = true;
    }
    this.selectedIngredientsCount = length;
    //this.shoppingListService.addToList(this.selectedRecipe);
  }

  addSelectedToList(): void {
    if ( this.selectedIngredientsCount < 1 ) { return; }
    //this.shoppingListService.addToList(this.selectedRecipe);
  }

  toggleSelect(i: number): void {
    this.selectedRecipe.ingredients[i].selected = !this.selectedRecipe.ingredients[i].selected;
    this.selectedIngredientsCount += this.selectedRecipe.ingredients[i].selected ? 1: -1;
  }
}
