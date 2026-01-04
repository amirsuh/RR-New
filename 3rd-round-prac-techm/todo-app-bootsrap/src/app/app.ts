import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from "./features/components/user/user";

@Component({
  selector: 'app-root',
  imports: [ User],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('todo-app-BS');
}
