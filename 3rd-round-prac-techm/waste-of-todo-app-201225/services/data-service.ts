import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
   private data = 'Shared Data';
  getData() { return this.data; }
}
