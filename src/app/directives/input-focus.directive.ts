import { Directive, Input, Renderer, ElementRef } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class InputFocusDirective {

  constructor(
    public renderer: Renderer,
    public elementRef: ElementRef
  ) {}

  @Input('autofocus') isEditing : boolean;

  ngOnInit(){
    if(this.isEditing){
      this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'focus', []);
    }
  }
}
