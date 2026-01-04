import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Api_Methods } from '../constant/Global_constant';
import { BatchModel } from '../model/class/user.model';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../model/interface/Common.model';

@Injectable({
  providedIn: 'root',
})
export class Batchservice {
  http = inject(HttpClient)

  createNewBatch(obj:BatchModel):Observable<IAPIResponse>{
    return this.http.post<IAPIResponse>(environment.API_URL+Api_Methods.BATCH,obj)
  }

  getAllBatches():Observable<IAPIResponse>{
    return this.http.get<IAPIResponse>(environment.API_URL+Api_Methods.BATCH)
  }
}
