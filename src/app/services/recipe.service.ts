import { Injectable } from '@angular/core';
// import { RECIPES } from '../recipes.data';
import { Recipe } from '../recipe';

var RECIPES: Recipe[] = [];

@Injectable()
export class RecipeService {

  getRecipes(): Promise<Recipe[]> {
    return Promise.resolve(RECIPES);
  }

  getSelectedRecipe(id: string): Promise<Recipe> {
    return this.getRecipes().then(recipes => recipes.find(recipe => recipe.id === id));
  }
}
