import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BatchModel } from '../../../core/model/class/user.model';
import { CommonModule } from '@angular/common';
import { Batchservice } from '../../../core/services/batchservice';
import { IAPIResponse } from '../../../core/model/interface/Common.model';
import { map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements OnInit, OnDestroy {
  newBatchObj: BatchModel = new BatchModel();
  batchServ = inject(Batchservice);
  batchList = signal<BatchModel[]>([]);
  subscription: Subscription = new Subscription();

  //Pagination Start
  startIndex: number = 0;
  endIndex: number = 0;
  PAGE_SIZE: number = 10;
  totalBatches: number = 0;
  noOfPages: number = 0;
  currentpage: number = 0;
  public numbers: number[] = [];
  dataWithPagination: any;
  //Pagination End

  ngOnInit() {
    this.loadBatches();
  }

  loadBatches() {
    this.subscription = this.batchServ
      .getAllBatches()
      .pipe(
        tap((originatProduct) => {
          this.noOfPages = Math.ceil(originatProduct.data.length / this.PAGE_SIZE);
          this.dataWithPagination = originatProduct.data;
          this.numbers = [...Array(this.noOfPages).keys()];
        }),
        map((product: IAPIResponse) => {
          return {
            data: product.data.slice(this.startIndex, this.PAGE_SIZE),
            message: product.message,
            result: product.result,
          };
        })
      )
      .subscribe({
        next: (result) => {
          this.batchList.set(result.data);
        },
        error: (error) => {},
      });
  }
  onSaveBatch() {
    console.log(this.newBatchObj);
    this.batchServ.createNewBatch(this.newBatchObj).subscribe({
      next: (result: IAPIResponse) => {
        if (result.result) {
          alert(result.message);
          this.loadBatches();
        } else {
          alert(result.message);
        }
      },
      error: (error) => {
        alert('API erroor' + error.error.message);
      },
    });
  }

  gotoNextPage(page: number) {
    this.currentpage = page;
    this.startIndex = page * this.PAGE_SIZE;
    this.endIndex = this.startIndex + this.PAGE_SIZE;
    const data = this.dataWithPagination.slice(this.startIndex, this.endIndex);
    this.batchList.set(data);
  }

  nextpage() {
    if (this.currentpage >= 0) {
      this.gotoNextPage(this.currentpage + 1);
    }
  }
  prevPage() {
    if (this.currentpage >= 0) {
      this.gotoNextPage(this.currentpage - 1);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
