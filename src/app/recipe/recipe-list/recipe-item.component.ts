import { Component, Input} from '@angular/core';
import { Recipe } from '../../recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  getThumbnailImage(): string {
    if(this.recipe.imagePaths.length) {
      return "url(" + this.recipe.imagePaths[0] + ")";
    }
    return "url(http://placehold.it/100x100)";
  }
}
