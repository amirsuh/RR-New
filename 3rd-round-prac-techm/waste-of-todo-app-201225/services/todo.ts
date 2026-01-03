import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Todo {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/todos').pipe(
      map(todos => {
        this.todosSubject.next(todos);
        return todos;
      }),
      catchError(err => { console.error(err); return []; })
    );
  }

  addTodo(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http.post<Todo>('http://localhost:3000/todos', todo).pipe(
      map(newTodo => {
        this.todosSubject.next([...this.todosSubject.value, newTodo]);
        return newTodo;
      })
    );
  }
}
