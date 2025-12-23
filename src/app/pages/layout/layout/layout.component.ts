import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { form } from '@angular/forms/signals';
import { from, interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'layout',
  imports: [
    SidebarComponent,
    HeaderComponent,
    SidebarComponent,
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isSidebarOpen = true;
stop$ = new Subject<void>();
sub = interval(1000).pipe(takeUntil(this.stop$)).subscribe({
  next:(data)=>console.log('data',data),
  // complete:(data:any)=>console.log('data',data),
  // error:(error)=>console.log(error)
});

  constructor(private auth: AuthService) {
    this.auth.getUserEmail();
    // Promises in Angular
    // this.auth.getUser().then(res=>console.log(res))
    this.loadUser();
    this.auth.getuserdata().subscribe({
      next:(data)=>console.log(data)
    })
  this.stop$.next();
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  async loadUser() {
    try {
      // Async/Await in Angular
      const user = await this.auth.getUser().then((res) => res);
      console.log(user.email);

      // Promise to Observable
      const promise = fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json());

      const observable$ = from(promise);

      observable$.subscribe((user) => console.log(user));
    } catch (error) {
      console.log('error', error);
    }
  }
}
