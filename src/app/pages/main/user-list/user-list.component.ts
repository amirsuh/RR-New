import { Component } from '@angular/core';
import { FilterHeaderComponent } from "../../shared/filter-header/filter-header.component";
import { formUserConfig } from './config';
import { IForm } from '../../../shared/interfaces/dynamic-form/form.interface';

@Component({
  selector: 'user-list',
  imports: [FilterHeaderComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
headingOfPage:string= 'User Management'
selectedItem:string=''
addNewUsers = formUserConfig as IForm;

getText(type:string){

}
}
