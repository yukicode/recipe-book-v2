import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { Ingredient } from './models/ingredient';
import { Recipe } from './models/recipe';
import { User } from './models/user.interface';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/recipe/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './components/recipe/recipe-detail/recipe-detail.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

import { ShoppingListService } from './services/shopping-list.service';
import { RecipeService } from './services/recipe.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { DataService } from './services/data.service';
import { Utils } from './services/utils.service';

import { AppRoutingModule } from './routing/app-routing.module';
import { RecipeRoutingModule } from './routing/recipe-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { InputFocusDirective } from './directives/input-focus.directive';
import { LoginComponent } from './components/user/login.component';
import { SignupComponent } from './components/user/signup.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { StateboxComponent } from './statebox/statebox.component';

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
    CreateRecipeComponent,
    StateboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RecipeRoutingModule,
    BrowserAnimationsModule,
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
