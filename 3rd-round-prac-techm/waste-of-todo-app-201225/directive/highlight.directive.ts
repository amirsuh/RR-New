import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight {

  constructor(private el:ElementRef) { }

  @HostListener ('mouseenter') mouseenter(){
    this.el.nativeElement.style.backgroundColor = 'yellow'
  }

    @HostListener ('mouseleave') mouseleave(){
    this.el.nativeElement.style.backgroundColor = 'green'
  }

}
