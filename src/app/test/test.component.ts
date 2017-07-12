import { Component, OnInit } from '@angular/core';
import { JsonProperty, Utils } from '../services/utils.service';
import { DataService } from '../services/data.service';
import { Ingredient } from '../ingredient';
import { Recipe } from '../recipe';

import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})



export class TestComponent implements OnInit {

  constructor(
    private db : DataService
  ) { }

  subscription:Subscription;
  recipes: Recipe[];

  ngOnInit() {
    this.subscription = this.db.recipeObserver.subscribe(
      data => {this.recipes = data;}
    );
  }

  onClick(): void{
    this.db.getAllRecipes();
  }
}
