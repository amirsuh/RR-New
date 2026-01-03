import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FilterHeaderComponent } from '../../shared/filter-header/filter-header.component';
import { CommonModule } from '@angular/common';
import { formConfigAnalytics } from './config';
import { IForm } from '../../../shared/interfaces/dynamic-form/form.interface';
import { Chart, registerables } from 'chart.js';
import { GodownServiceService } from '../../../core/godown-service.service';
import { map, tap } from 'rxjs';

Chart.register(...registerables);
@Component({
  selector: 'analytics',
  imports: [FilterHeaderComponent, CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class AnalyticsComponent implements OnInit, AfterViewInit, OnDestroy {
  worker!: Worker;
  result: any;
  loading = false;

  headingOfPage: string = 'Welcome to Your Analytics';
  selectedItem: string = '';
  addNewAnalytics = formConfigAnalytics as IForm;
  goDowns: any[] = [];
  isChartsInitialized = signal(false);

  totalWarehouses: number = 0;
  activeWarehouses: number = 0;
  totalCapacity: number = 0;
  totalStock: number = 0;
  utilization: string = '';
  capacityChart?: Chart;
  statusChart?: Chart;
  @ViewChild('capacityChart') capacityChartRef!: ElementRef;
  @ViewChild('statusChart') statusChartRef!: ElementRef;
  constructor(private godownService: GodownServiceService) {}
  ngOnInit(): void {

    this.loadData();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isChartsInitialized.set(true);
      this.createCapacityChart();
      this.createStatusChart();
    }, 1000);
  }


  destroyCharts() {
    this.capacityChart?.destroy();
    this.statusChart?.destroy();
  }

  ngOnDestroy() {
    if (this.worker) {
      this.worker.terminate();
    }
    this.destroyCharts();
  }
  loadData() {
    this.godownService
      .getGodowndetails()
      .pipe(
        tap((godowns: any[]) => {
          this.totalWarehouses = godowns.length;
          this.activeWarehouses = godowns.filter(
            (g) => g.status === 'active'
          ).length;
          this.totalCapacity = godowns.reduce((s, g) => s + g.capacity, 0);
          this.totalStock = godowns.reduce((s, g) => s + g.currentStock, 0);
          this.utilization = (
            (this.totalStock / this.totalCapacity) *
            100
          ).toFixed(2);
        }),
        map((godowns: any[]) =>
          godowns.map((g) => ({
            id: g.id,
            name: g.name,
            capacity: g.capacity,
            currentStock: g.currentStock,
            status: g.status,
          }))
        )
      )
      .subscribe((res) => {
        this.goDowns = res;
        console.log('Godown details in analytics:', res);
      });
  }
  getText($event: string) {}

  createCapacityChart() {
    new Chart('capacityChart', {
      type: 'bar',
      data: {
        labels: this.goDowns.map((g) => g.name),
        datasets: [
          {
            label: 'Capacity',
            data: this.goDowns.map((g) => g.capacity),
            backgroundColor: '#4e73df',
          },
          {
            label: 'Current Stock',
            data: this.goDowns.map((g) => g.currentStock),
            backgroundColor: '#1cc88a',
          },
           {
            label: 'Able to Store',
            data: this.goDowns.map((g) => g.capacity - g.currentStock),
            backgroundColor: '#053121ff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  createStatusChart() {
    new Chart('statusChart', {
      type: 'pie',
      data: {
        labels: ['Active', 'Inactive'],
        datasets: [
          {
            data: [
              this.activeWarehouses,
              this.totalWarehouses - this.activeWarehouses,
            ],
            backgroundColor: ['#1cc88a', '#e74a3b'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
