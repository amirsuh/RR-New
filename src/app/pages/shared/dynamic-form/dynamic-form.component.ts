import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IForm,
  IFormControl,
  IValidator,
} from '../../../shared/interfaces/dynamic-form/form.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { GodownServiceService } from '../../../core/godown-service.service';
import { GodownDetails } from '../../../shared/interfaces/godown-details/godown.interface';
declare var bootstrap: any;
@Component({
  selector: 'dynamic-form',
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  providers: [DatePipe]
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() form!: IForm;
  fb = inject(FormBuilder);
  dynamicForGrp: FormGroup = this.fb.group({});
  isSubmitted: boolean = false;

  // edit godown
  @Input() godown!: GodownDetails;
  // edit godown end

  constructor(private service: GodownServiceService,private datePipe: DatePipe) {}

  ngOnInit(): void {
    if (this.form.formControls) {
      let formGroup: any = {};
      this.form.formControls.forEach((controls: IFormControl) => {
        let controlValidators: any = [];
        if (controls.validators) {
          controls.validators.forEach((val: IValidator) => {
            if (val.validationName === 'required')
              controlValidators.push(Validators.required);
            if (val.validationName === 'email')
              controlValidators.push(Validators.email);
            if (val.validationName === 'minlength')
              controlValidators.push(
                Validators.minLength(val.minLength as number)
              );
            if (val.validationName === 'maxlength')
              controlValidators.push(
                Validators.maxLength(val.maxLength as number)
              );
            if (val.validationName === 'pattern')
              controlValidators.push(Validators.pattern(val.pattern as string));
          });
        }
        formGroup[controls.name] = [controls.value || '', controlValidators];
      });

      this.dynamicForGrp = this.fb.group(formGroup);
    }
    console.log(this.godown);
  }

  ngOnChanges(changes: SimpleChanges) {
    //const dateObject = new Date('Mon Dec 01 2025 10:00:00 GMT+0530 (India Standard Time)');

    if (changes['godown']) {
      this.dynamicForGrp.patchValue(this.godown);
      if (this.godown && this.godown.lastUpdated) {
        const startDateObject = new Date(this.godown.lastUpdated);
        const formattedDate = this.datePipe.transform(startDateObject, 'yyyy-MM-dd');
        this.dynamicForGrp.patchValue({ lastUpdated: formattedDate });
        this.openModal()
      }

    }
  }

  openModal(){
    const modalEl = document.getElementById('dynamicModal');
      const modalInstance =
        bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modalInstance.show();
  }
  onSubmit() {
    this.isSubmitted = true;

    if (this.dynamicForGrp.invalid) {
      this.dynamicForGrp.markAllAsTouched();
      return;
    }

    console.log(this.dynamicForGrp.value);
    if (this.dynamicForGrp.valid) {
      this.service.godowndetails$.push(this.dynamicForGrp.value);
      (document.activeElement as HTMLElement)?.blur();

      const modalEl = document.getElementById('dynamicModal');
      const modalInstance =
        bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modalInstance.hide();

      // ✅ Show toast
      const toastEl = document.getElementById('successToast');
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();

      this.resetDynamicForm();
    }
  }
  resetDynamicForm() {
    this.isSubmitted = false;
    this.dynamicForGrp.reset();
    this.dynamicForGrp.markAsPristine();
    this.dynamicForGrp.markAsUntouched();
  }

  getValidationErrors(control: IFormControl): string {
    const myFormControl = this.dynamicForGrp.get(control.name);
    let errMsg = '';
    control.validators.forEach((val) => {
      if (myFormControl?.hasError(val.validationName as string)) {
        errMsg = val.message as string;
      }
    });
    return errMsg;
  }
}
