import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  debounceTime,
  delay,
  filter,
  forkJoin,
  map,
  Observable,
  of,
  retryWhen,
  take,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }

  getUserss(): Observable<string[]> {
    return this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users') // Replace with actual API if needed
      .pipe(
        // Retry the HTTP request up to 3 times if it fails
        retryWhen((errors) =>
          errors.pipe(
            delay(1000), // delay each retry by 1 second
            take(3) // retry 3 times before throwing the error
          )
        ),

        // Map the response into a string array of user names
        map((users) => users.map((u) => u.name)),

        // Filter out any names that are null or empty
        filter((names: string[]) => names.length > 0),

        // Additional transformation: Add a prefix to each name
        map((names) => names.map((name) => `User: ${name}`)),

        // Handle errors and return an empty array as fallback
        catchError((err) => {
          console.error('Error fetching users:', err);
          return of([]); // return an empty array on error
        }),

        // Debounce the stream to avoid unnecessary API calls (useful for search or frequent calls)
        debounceTime(300),

        // Ensure that only the first 5 users are taken
        take(5)
      );
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts').pipe(
      map((posts) =>
        posts.map((post) => ({
          title: post.title,
          // body: post.body,
        }))
      ) // Extract only the 'title' of each post
    );
    // return this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts').pipe(
    //  tap(response => console.log('Response from API:', response)),
    //   map(posts => posts.map(post => post.title))
    // );

    // .pipe(
    //  map(users => users.map(u => `'title': ${u.title}`)),
    // );
  }

  loadData() {
    return forkJoin({
      users: this.getUsers(),
      posts: this.getPosts(),
    }).pipe(
      // Optionally, map the combined result if you need to transform data
      map(({ users, posts }) => {
        return {
          users,
          posts: posts.map((post) => ({
            title: post.title,
            // body: post.body,
          })),
        };
      }),
      catchError((err) => {
        console.error('Error loading data:', err);
        return of({ users: [], posts: [] }); // Return empty arrays if there's an error
      })
    );
  }
}
