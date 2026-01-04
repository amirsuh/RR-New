import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BatchModel } from '../../../core/model/class/user.model';
import { CommonModule } from '@angular/common';
import { Batchservice } from '../../../core/services/batchservice';
import { IAPIResponse } from '../../../core/model/interface/Common.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements OnInit,OnDestroy{
  newBatchObj: BatchModel = new BatchModel();
  batchServ = inject(Batchservice);
  batchList = signal<BatchModel[]>([])
  subscription:Subscription=new Subscription;
 ngOnInit(){
this.loadBatches()
 }

 loadBatches(){
  this.subscription = this.batchServ.getAllBatches().subscribe({
    next:(result:IAPIResponse)=>{
      this.batchList.set(result.data)
    },
    error:(error)=>{

    }
  })
 }
  onSaveBatch() {
    console.log(this.newBatchObj);
    this.batchServ.createNewBatch(this.newBatchObj).subscribe({
      next: (result: IAPIResponse) => {
        if (result.result) {
          alert(result.message);
          this.loadBatches()
        }else{
          alert(result.message)
        }
      },
      error: (error) => {
        alert('API erroor' + error.error.message);
      },
    });
  }

ngOnDestroy():void{
this.subscription.unsubscribe()
}
}
