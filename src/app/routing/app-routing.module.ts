import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from '../components/shopping-list/shopping-list.component';
import { RecipeComponent } from '../components/recipe/recipe.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { LoginComponent } from '../components/user/login.component';
import { SignupComponent } from '../components/user/signup.component';
import { CreateRecipeComponent } from '../components/create-recipe/create-recipe.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/recipe', pathMatch: 'full' },
    { path: 'recipe', component: RecipeComponent },
    { path: 'shoppinglist', component: ShoppingListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'create-recipe', component: CreateRecipeComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }