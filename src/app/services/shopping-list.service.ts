import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ShoppingListService {
  private _ingredients: Ingredient[] = [];
  private _names: string[] = [];
  private _index: number[] = [];
  private _ingredientString: string[] = [];
  private _itemCount: number = 0;

  private _itemCountSource = new BehaviorSubject<number>(this._itemCount);
  itemCountObserver = this._itemCountSource.asObservable();

  getList(): Ingredient[] {
    return this._ingredients;
  }

  getListString(): string[] {
    return this._ingredientString;
  }

  getItemCount(): Observable<number> {
    return this.itemCountObserver;
  }

  addToList(items: Ingredient[], recipeName: string): void {
    this._index.push(this._ingredients.length);
    this._itemCount += items.length;
    this._itemCountSource.next(this._itemCount);
    this._names.push(recipeName);
    Array.prototype.push.apply(this._ingredients, items);

    this._ingredientString.push(recipeName);
    for(var i=0; i<items.length; i++){
      this._ingredientString.push("✤    " + this._ingredients[i].name + ", " + this._ingredients[i].amount + " " + this._ingredients[i].unit);
    }
  }

  deleteIngredient(i: number): void{
    this._ingredientString.splice(i, 1);
    this._itemCount--;
    this._itemCountSource.next(this._itemCount);
  }

  changeIngredient(s: string, i: number): void{
    this._ingredientString[i] = s;
  }

  addIngredient(s: string): void{
    this._ingredientString.push(s);
    this._itemCount++;
    this._itemCountSource.next(this._itemCount);
  }

  deleteAllIngredients(): void{
    this._ingredientString = [];
    this._ingredients = [];
    this._index = [];
    this._names = [];
    this._itemCount = 0;
    this._itemCountSource.next(this._itemCount);
  }
}
