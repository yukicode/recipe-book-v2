import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

import { Recipe } from '../../models/recipe';
import { Ingredient } from '../../models/ingredient';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})

export class CreateRecipeComponent implements OnInit {

  recipe: Recipe;
  myForm: FormGroup;
  isAuth: boolean;
  user: User;
  wait_1: any;
  wait_2: any;
  wait_3: any;

  constructor(
    private fb: FormBuilder,
    private db: DataService,
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.isAuth = this.auth.isAuthenticated();
    //if not authenticated, wait for a second and retry
    //if still not anthenticated, redirect to log in page
    if(!this.isAuth){
      this.wait_1 = setTimeout(() => {
        this.isAuth = this.auth.isAuthenticated();
        if(!this.isAuth){
          this.wait_2 = setTimeout(() => this.router.navigate(['/login']), 2000)
        };
      }, 1000);
    }

    this.recipe = new Recipe();
    this.recipe.imagePaths[0] = "http://placehold.it/1024x300";
    this.buildForm();
  }

  ngOnDestroy(){
    if(this.wait_1) {clearTimeout(this.wait_1);}
    if(this.wait_2) {clearTimeout(this.wait_2);}
    if(this.wait_3) {clearTimeout(this.wait_3);}
  }

  buildForm(): void {
    this.myForm = this.fb.group({
      title: [''],
      imagePath: [''],
      tags: this.fb.array([this.fb.control('')]),
      prepTime: [''],
      cookTime: [''],
      serving: [''],
      description: [''],
      ingredients: this.fb.array([
        this.initIngreident(),
        this.initIngreident(),
        this.initIngreident(),
        this.initIngreident(),
        this.initIngreident()
      ]),
      directions: this.fb.array([
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control('')
        ])
    });
  }

  setTitle(): void {
    this.recipe.title = this.myForm.controls['title'].value;
  }

  setImagePath(): void {
    this.recipe.imagePaths[0] = this.myForm.controls['imagePath'].value ? this.myForm.controls['imagePath'].value : "http://placehold.it/1024x300";
  }

  addTag(i: number): void {
    var control = <FormArray>this.myForm.controls['tags'];
    var value = control.controls[i].value;
    this.recipe.tags[i] = value || this.recipe.tags[i];
    if ((i === control.length - 1) && control.controls[i].value) {
      control.push(this.fb.control(''));
    }
  }

  deleteTag(i: number): void {
    var control = <FormArray>this.myForm.controls['tags'];
    control.removeAt(i);
    this.recipe.tags.splice(i, 1);
    if (control.length == 0) {
      control.push(this.fb.control(''));
    }
  }

  setPrepTime(): void {
    this.recipe.prepTime = this.myForm.controls['prepTime'].value;
  }

  setCookTime(): void {
    this.recipe.cookTime = this.myForm.controls['cookTime'].value;
  }

  setServing(): void {
    this.recipe.serving = this.myForm.controls['serving'].value;
  }

  initIngreident(): FormGroup {
    return this.fb.group({
      name: [''],
      amount: [''],
      unit: ['']
    });
  }

  deleteIngredient(i: number): void {
    var ingredientControl = <FormArray>this.myForm.controls['ingredients'];
    var ing = this.recipe.ingredients[i];
    if (ingredientControl.controls[i]) {
      ingredientControl.removeAt(i);
    }
    if (ing) {
      this.recipe.ingredients.splice(i, 1);
    }
  }

  updateIngredientName(i: number): void {
    var ingredientControl = <FormArray>this.myForm.controls['ingredients'];
    var value = (<FormGroup>ingredientControl.controls[i]).controls['name'].value;
    if (!this.recipe.ingredients[i]) {
      this.recipe.ingredients[i] = new Ingredient(value, 0, '');
    } else {
      this.recipe.ingredients[i].name = value;
    }
    if (i === ingredientControl.length - 1) {
      ingredientControl.push(this.initIngreident());
    }
  }

  updateIngredientAmount(i: number): void {
    var ingredientControl = <FormArray>this.myForm.controls['ingredients'];
    var value = (<FormGroup>ingredientControl.controls[i]).controls['amount'].value;
    if (!this.recipe.ingredients[i]) {
      this.recipe.ingredients[i] = new Ingredient('', value, '');
    } else if(!value)
    {
      return;
    } else {
      this.recipe.ingredients[i].amount = parseFloat(value);
    }
  }

  updateIngredientUnit(i: number): void {
    var ingredientControl = <FormArray>this.myForm.controls['ingredients'];
    var value = (<FormGroup>ingredientControl.controls[i]).controls['unit'].value;
    if (!this.recipe.ingredients[i]) {
      this.recipe.ingredients[i] = new Ingredient('', 0, value);
    } else {
      this.recipe.ingredients[i].unit = value;
    }
  }

  addDirection(i: number): void {
    var directionControl = <FormArray>this.myForm.controls['directions'];
    var value = directionControl.controls[i].value;
    if(!value) { return; }
    this.recipe.steps[i] = value;
    if( i === directionControl.length -1){
      directionControl.push(this.fb.control(''));
    }
  }

  submitForm(): void{
    this.db.postNewRecipe(this.recipe).then(data => {
      this.db.getAllRecipes();
      this.wait_3 = setTimeout(() => this.router.navigate(['/recipe']), 1000);
    }, error => console.log(error));
  }
}
