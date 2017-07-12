import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { AuthService } from './auth.service';
import { RecipeService } from './recipe.service';
import { Utils } from './utils.service';

import { User } from '../user.interface';
import { Ingredient } from '../ingredient';
import { Recipe } from '../recipe';


declare var db: any;

var RECIPES: Recipe[] = [];
var _selectedRecipe: Recipe;

@Injectable()
export class DataService {

  constructor(
    private auth: AuthService
  ) { }

  private dbPath: string = 'recipeTest';
  private _recipeSource = new BehaviorSubject<Recipe[]>(RECIPES);
  private _selectedRecipeSource = new BehaviorSubject<Recipe>(_selectedRecipe);
  recipeObserver = this._recipeSource.asObservable();
  selectedRecipeObserver = this._selectedRecipeSource.asObservable();


  postNewRecipe(recipe: Recipe) {
    if(!this.auth.isAuthenticated()){
      console.log("user is not authenticated! please login!");
      return;
    }

    this.addUserInfo(recipe);
    var newKey = db.ref().child(this.dbPath).push();
    recipe.key = newKey.key;
    return newKey.set(recipe);
 }

  getAllRecipes(){
    var recipeRef = db.ref(this.dbPath);
    recipeRef.on('value', (snapshot)=>{
      RECIPES = [];
      snapshot.forEach(
        data => { RECIPES.push(Utils.deserialize(Recipe, data.val()));}
      );
      this._recipeSource.next(RECIPES);
    });
  }

  getSelectedRecipe(id: string){
    if(!RECIPES) {
      return null;
    }
    _selectedRecipe = RECIPES.find( recipe => recipe.key === id);
    this._selectedRecipeSource.next(_selectedRecipe);
    return this.selectedRecipeObserver;
  }

  addUserInfo(recipe: Recipe){

    if(recipe.author === ""){
      var user = this.auth.getUser();
      recipe.author = user.displayName;
      recipe.authorId = user.uid;
    }

    if(!recipe.initDate) {
      recipe.initDate = new Date().getDate();
    }
    recipe.updateDate = new Date().getDate();
  }



}
