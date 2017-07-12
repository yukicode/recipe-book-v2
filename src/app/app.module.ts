import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeComponent } from './recipe/recipe.component';
import { Ingredient } from './ingredient';
import { Recipe } from './recipe';
import { User } from './user.interface';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe/recipe-list/recipe-item.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { DropdownDirective } from './dropdown.directive';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { ShoppingListService } from './services/shopping-list.service';
import { RecipeService } from './services/recipe.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { DataService } from './services/data.service';
import { Utils } from './services/utils.service';

import { AppRoutingModule } from './routing/app-routing.module';
import { RecipeRoutingModule } from './routing/recipe-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InputFocusDirective } from './directives/input-focus.directive';
import { LoginComponent } from './user/login.component';
import { SignupComponent } from './user/signup.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    DropdownDirective,
    ShoppingListComponent,
    PageNotFoundComponent,
    InputFocusDirective,
    LoginComponent,
    SignupComponent,
    CreateRecipeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RecipeRoutingModule,
    AppRoutingModule,
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    AuthService,
    DataService,
    Utils
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
