import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statebox',
  templateUrl: './statebox.component.html',
  styleUrls: ['./statebox.component.css'],
})
export class StateboxComponent {
  @Input() config: any;

  defaultConfig = {
    show: false,
    title: 'Loading...',
    content: '',
    updating: true
  };

  constructor() {
    if(!this.config) { this.config = this.defaultConfig; }
  }
}
