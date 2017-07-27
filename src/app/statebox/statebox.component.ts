import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statebox',
  templateUrl: './statebox.component.html',
  styleUrls: ['./statebox.component.css'],
})
export class StateboxComponent implements OnInit {
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

  ngOnInit() {
  }

  changeState() {
    this.config.show = !this.config.show;
  }

}
