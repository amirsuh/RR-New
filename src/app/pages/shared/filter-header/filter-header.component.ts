import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { formConfig } from '../config';
import { IForm } from '../../../shared/interfaces/dynamic-form/form.interface';
import { JsonPipe } from '@angular/common';
import { GodownDetails } from '../../../shared/interfaces/godown-details/godown.interface';
declare var bootstrap: any;

@Component({
  selector: 'filter-header',
  imports: [FormsModule, DynamicFormComponent,JsonPipe],
  templateUrl: './filter-header.component.html',
  styleUrl: './filter-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterHeaderComponent implements OnInit,OnChanges {
  @Input() compName: string = '';
  @Input() filterName: string = '';
  value = '';
  @Output() changeEvent = new EventEmitter<string>();
  @Output() changeInput = new EventEmitter<string>();
  @Output() changeLayoutFlag = new EventEmitter<string>();
  @Input() formData = [];
  @Input() addNewGodown!:IForm;

// edit godown
  @Input() godown?: GodownDetails;
  @Output() save = new EventEmitter<GodownDetails>();
  @Output() close = new EventEmitter<void>();
  editableGodown!: GodownDetails
// edit godewn end
  // Sorting vars
  @Output() sortChange = new EventEmitter<{
    key: string;
    direction: string;
  }>();
  sortKey = '';
  direction: 'asc' | 'desc' = 'asc';
  @Input() sortOpt:any = '';
  // Sorting Ends

  isFlag: string = '';
  setMessage: string = '';


  constructor(public common: CommonService) {}

  ngOnInit() {
    debugger
    console.log(this.filterName);
    this.common.layouFlag$.subscribe((flag) => {
      this.isFlag = flag;
    });
  }
ngOnChanges(changes: SimpleChanges) {
  if (changes['godown'] && changes['godown']?.currentValue) {
    this.editableGodown = this.godown ? {...this.godown} : this.getEmptyGodown();
  }
  console.log(changes)
}
addnewGodownPopup(){
  this.editableGodown = this.getEmptyGodown()
  const modalEl = document.getElementById('dynamicModal');
      const modalInstance =
        bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modalInstance.show();
}
 getEmptyGodown(): GodownDetails {
    return {
  id: null as any,
  name: '',
  description: '',
  capacity: null as any,
  storage: null as any,
  currentStock: null as any,
  inwardStock: null as any,
  outwardStock: null as any,
  lastUpdated: undefined,
  status: 'inactive',
  location: '',
  contactPerson: '',
  contactNumber: ''

    };
  }
  sendMessage(name: string, type: string) {
    this.setMessage = type;
    this.changeEvent.emit(name);
  }

  updateValue(newValue: string) {

    this.value = newValue;
    this.changeInput.emit(newValue);
  }

  changeLayout() {
    if(this.isFlag=='card' || this.isFlag==''){
     this.isFlag ='table'
    }else{
      this.isFlag ='card'
    }
    this.common.layouFlag$.next( this.isFlag);
    this.changeLayoutFlag.emit( this.isFlag);
  }

  sort(Evtr: Event) {
    const key = (Evtr.target as HTMLSelectElement);
    let value = key.value; // value will be a JSON string
    let option = JSON.parse(value); // parse back to object
    this.sortChange.emit({ key: option.column, direction: option.direction });

    // const selectedOption = this.sortOptions[(Evtr.target as HTMLSelectElement).selectedIndex];
    // this.sortChange.emit({ key: selectedOption.column, direction: selectedOption.direction });
    // const key = (Evtr.target as HTMLSelectElement).value;
    // if (this.sortKey === key) {
    //   // toggle direction if same key selected again
    //   this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    // } else {
    //   // new key → reset to ascending
    //   this.sortKey = key;
    //   this.direction = 'asc';
    // }

    // this.sortChange.emit({
    //   key: this.sortKey,
    //   direction: this.direction,
    // });
  }
}
