import { ChangeDetectionStrategy, Component, linkedSignal, model, signal, untracked, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.ShadowDom
})
export class Counter {
count=model<number>(0)
increment(){this.count.update(c => c + 1);}
decrement(){this.count.update(c => c - 1);}


 firstNum = signal<number>(5);
 secondNum = signal<number>(7);
 total = linkedSignal({
   source: this.firstNum,
   computation: () => (this.firstNum() + untracked(this.secondNum)),
 });


  constructor() {
   setTimeout(() => {
    this.firstNum.set(6)
  }, 8000);
  setTimeout(() => {
    this.secondNum.set(10)
  }, 10000);
 }
}
