import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
export interface User {
  email: string;
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class Auth {
   // Signal-based reactive state (Angular 20 modern approach)
  private user = signal<User | null>(null);
  public user$ = this.user.asReadonly();

  // Computed signals for quick checks
  isLoggedIn = computed(() => !!this.user());
  currentUser = computed(() => this.user());

  // Legacy RxJS observable for backwards compatibility
  private userSubject = new BehaviorSubject<User | null>(null);
  public userObservable$ = this.userSubject.asObservable();

  constructor(private router: Router) {
    // Restore user from localStorage on app init
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user.set(JSON.parse(savedUser));
      this.userSubject.next(this.user());
    }
  }

  // Login method (simulate API call)
  login(credentials: { email: string; password: string }): void {
    // Simulate API delay
    setTimeout(() => {
      // Mock successful login (replace with real HttpClient.post later)
      if (credentials.email && credentials.password) {
        const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Mock JWT
        const user: User = {
          email: credentials.email,
          token: fakeToken
        };

        // Update signals and localStorage
        this.user.set(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);

        // Redirect to todos
        this.router.navigate(['/todos']);
      }
    }, 1000);
  }

  // Logout method
  logout(): void {
    this.user.set(null);
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Get token for HTTP interceptor
  getToken(): string | null {
    return this.user()?.token || null;
  }

  // Check if logged in (for guards)
  isAuthenticated(): boolean {
    return !!this.user();
  }

  // Simulate token refresh (for production)
  refreshToken(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        // Mock refresh logic
        const current = this.user();
        if (current) {
          this.user.set({ ...current, token: 'refreshed-token...' });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }
}
