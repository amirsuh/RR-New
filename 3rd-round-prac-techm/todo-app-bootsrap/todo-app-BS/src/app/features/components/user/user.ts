import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BatchModel } from '../../../core/model/class/user.model';

@Component({
  selector: 'app-user',
  imports: [FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {

newBatchObj: BatchModel = new BatchModel();
}
