import {
  Component,
  ElementRef,
  ViewChild,
  afterNextRender,
} from '@angular/core';
import { GodownServiceService } from '../../../core/godown-service.service';
import { GodownDetails } from '../../../shared/interfaces/godown-details/godown.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { FilterHeaderComponent } from '../../shared/filter-header/filter-header.component';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { formConfig } from '../../shared/config';
import { IForm } from '../../../shared/interfaces/dynamic-form/form.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// import { OnpushDemoComponent } from "../demo/onpush-demo/onpush-demo.component";

@Component({
  selector: 'dashboard',
  imports: [CommonModule, FormsModule, FilterPipe, FilterHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  godownDetails: GodownDetails[] = [];
  isLoading: boolean = false;
  headingOfPage: string = 'Turmeric Godown Dashboard';
  searchText: string = '';
  selectedItem: string = '';
  isLayout: string = 'card';
  @ViewChild('username') inputRef!: ElementRef<HTMLInputElement>;
  sortOptions: any;
  addNewGodown = formConfig as IForm;
  editGodownData!:GodownDetails
  godowns$?:Observable<GodownDetails[]>;
  constructor(
    private godownService: GodownServiceService,
    private router: Router,private store:Store<{goDown:GodownDetails[]}>
  ) {
    this.sortOptions = [
      { id: 0, label: 'Name Ascending', column: 'name', direction: 'asc' },
      { id: 1, label: 'Name Descending', column: 'name', direction: 'desc' },
      { id: 2, label: 'Status Ascending', column: 'status', direction: 'asc' },
      {
        id: 3,
        label: 'Status Descending',
        column: 'status',
        direction: 'desc',
      },
      {
        id: 4,
        label: 'Location Ascending',
        column: 'location',
        direction: 'asc',
      },
      {
        id: 5,
        label: 'Location Descending',
        column: 'location',
        direction: 'desc',
      },
    ];
  }

  ngOnInit() {

    this.isLoading = true;
    setTimeout(() => {
      this.godownService.getGodowndetails().subscribe(
        (res: GodownDetails[]) => {
          this.godownDetails = res;
          console.log(res);
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      );
    }, 1000);
  }

  // New Lifcycle hooks in 17,18
  // afterRender(() => {
  //   console.log('DOM is ready!')
  // })
  // afterNextRender(() => {
  //   console.log('View is updated after state change')
  // });
  gotoGodownPage(godown: GodownDetails) {
    console.log(godown);
    let godownId: number = godown.id;
    this.router.navigate(['/layout/stock-report', godownId]);
  }

  getText($event: string) {
    this.searchText = $event;
  }
  getLayoutFlag(event: any) {
    console.log(event);
    this.isLayout = event;
  }
  onSort(sort: any) {
    const { key, direction } = sort;

    this.godownDetails = [...this.godownDetails].sort((a: any, b: any) => {
      // Handle undefined / optional values
      const aValue = a[key] ?? '';
      const bValue = b[key] ?? '';

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  editGodown(godown: GodownDetails) {
    this.editGodownData = godown
  }
}
