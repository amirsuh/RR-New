import { Injectable } from '@angular/core';
import { GodownDetails } from '../shared/interfaces/godown-details/godown.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GodownServiceService {
  $godownId:BehaviorSubject<number> = new BehaviorSubject<number>(0)
  constructor(private http:HttpClient) {}
  godowndetails$: GodownDetails[] = []

  getGodowndetails():Observable<GodownDetails[]> {
    return this.http.get("http://localhost:5001/goDowns") as Observable<GodownDetails[]>;
  }
}
