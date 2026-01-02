import { Injectable } from '@angular/core';
import { GodownDetails } from '../shared/interfaces/godown-details/godown.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GodownServiceService {
  $godownId:BehaviorSubject<number> = new BehaviorSubject<number>(0)
  constructor() {}
  godowndetails$: GodownDetails[] = []

  getGodowndetails(): Observable<GodownDetails[]> {
    return of(this.godowndetails$);
  }
}
