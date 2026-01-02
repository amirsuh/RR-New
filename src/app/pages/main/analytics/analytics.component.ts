import { Component, OnInit } from '@angular/core';
import { FilterHeaderComponent } from '../../shared/filter-header/filter-header.component';
import { CommonModule } from '@angular/common';
import { formConfigAnalytics } from './config';
import { IForm } from '../../../shared/interfaces/dynamic-form/form.interface';

@Component({
  selector: 'analytics',
  imports: [FilterHeaderComponent, CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit {
  worker!: Worker;
  result: any;
  loading = false;

  headingOfPage: string = 'Welcome to Your Analytics';
  selectedItem: string = '';
  addNewAnalytics = formConfigAnalytics as IForm;

  constructor() {}
  ngOnInit(): void {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(
        new URL(
          '../../../core/web-workers/sales-calculation.worker.ts',
          import.meta.url
        )
      );
    }
  }
  processSalesData() {
    this.loading = true;

    const largeSalesData = this.generateMockData(100000);

    this.worker.postMessage(largeSalesData);

    this.worker.onmessage = ({ data }) => {
      this.result = data;
      this.loading = false;
    };
  }

  generateMockData(count: number) {
    return Array.from({ length: count }).map(() => ({
      price: Math.random() * 100,
      quantity: Math.floor(Math.random() * 10),
      category: ['Electronics', 'Clothing', 'Food'][
        Math.floor(Math.random() * 3)
      ],
    }));
  }

  ngOnDestroy() {
    if (this.worker) {
      this.worker.terminate();
    }
  }
  getText(type: string) {}
}
