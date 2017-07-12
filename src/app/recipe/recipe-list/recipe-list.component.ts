import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate} from '@angular/core';
import { Recipe } from '../../recipe';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor (private dataService: DataService){}

  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.dataService.recipeObserver.subscribe(
      data => { this.recipes = data; }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
