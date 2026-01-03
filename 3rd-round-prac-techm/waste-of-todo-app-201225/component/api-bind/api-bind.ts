import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api-bind',
  imports: [CommonModule],
  templateUrl: './api-bind.html',
  styleUrl: './api-bind.scss',
})
export class ApiBind implements OnInit{
  user$!:Observable<any>
  newUser$!:Observable<any>
  users: string[] = [];  // Hold the list of users
  loading: boolean = true;
constructor(private apiservice:ApiService){}

ngOnInit(){
   this.user$ =this.apiservice.getUsers()
   this.newUser$ = this.apiservice.getUserss()
   console.log(this.newUser$,this.user$)
   this.apiservice.getUserss().subscribe((data) => {
      this.users = data;  // Assign the fetched user names to the 'users' array
      this.loading = false;  // Set loading to false once data is fetched
    });

    this.apiservice.loadData().subscribe(res=>{
      console.log(res)
    })
}
}
