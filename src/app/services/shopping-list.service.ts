import { Injectable } from '@angular/core';
import { Ingredient } from '../ingredient';

@Injectable()
export class ShoppingListService {
  private _ingredients: Ingredient[] = [];
  private _names: string[] = [];
  private _index: number[] = [];
  private _ingredientString: string[] = [];

  getList(): Ingredient[] {
    return this._ingredients;
  }

  getListString(): string[] {
    return this._ingredientString;
  }

  addToList(items: Ingredient[], recipeName: string): void {
    this._index.push(this._ingredients.length);
    this._names.push(recipeName);
    Array.prototype.push.apply(this._ingredients, items);

    this._ingredientString.push(recipeName);
    for(var i=0; i<items.length; i++){
      this._ingredientString.push("✤    " + this._ingredients[i].name + ", " + this._ingredients[i].amount + " " + this._ingredients[i].unit);
    }
  }

  deleteIngredient(i: number): void{
    this._ingredientString.splice(i, 1);
  }

  changeIngredient(s: string, i: number): void{
    this._ingredientString[i] = s;
  }

  addIngredient(s: string): void{
    this._ingredientString.push(s);
  }

  deleteAllIngredients(): void{
    this._ingredientString = [];
  }
}
