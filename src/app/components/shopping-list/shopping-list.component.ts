import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  items: string[];
  isEditing: boolean[] = [];

  constructor(
    private shoppingListService: ShoppingListService
    ) { }

  ngOnInit() {
    this.items = this.shoppingListService.getListString();
    for (var i = 0; i < this.items.length; i++) {
      this.isEditing[i] = false;
    }
  }

  delete(i: number): void {
    this.shoppingListService.deleteIngredient(i);
    this.isEditing.splice(i, 1);
  }

  edit(i: number): void {
    if (!this.isEditing[i]) {
      this.isEditing[i] = true;
    }
  }

  save(i: number): void {
    this.isEditing[i] = false;
  }

  onBlur(event: any, i: number){
    this.shoppingListService.changeIngredient(event.target.value, i);
    this.isEditing[i] = false;
  }

  addItemActivate(): void{
    this.shoppingListService.addIngredient("");
    this.isEditing[this.items.length-1] = true;
  }

  deleteAllIngredients(): void{
    this.shoppingListService.deleteAllIngredients();
    this.items = this.shoppingListService.getListString();
    this.isEditing = [];
  }

  print(): void{
    window.print();
  }
}
