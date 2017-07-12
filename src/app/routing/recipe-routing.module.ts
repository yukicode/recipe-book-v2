import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeComponent } from '../recipe/recipe.component';
import { RecipeDetailComponent } from '../recipe/recipe-detail/recipe-detail.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const RECIPE_ROUTES: Routes = [
  {
    path: 'recipe',
    component: RecipeComponent,
    children: [{ path: ':id', component: RecipeDetailComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(RECIPE_ROUTES)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
