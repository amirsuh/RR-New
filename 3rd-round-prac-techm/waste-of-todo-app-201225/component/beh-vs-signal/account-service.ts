import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
    user$ = new BehaviorSubject<any>(null);
  settings$ = new BehaviorSubject<any>({ theme: 'dark' });

  cart$ = new BehaviorSubject<any>({
    items: []
  });

  account$ = new BehaviorSubject<any>({
    name: 'John Doe',
    number: 'ACC-123'
  });

  balance$ = new BehaviorSubject<number>(1250.75);


   // base signals
  users = signal<any | null>(null);
  settings = signal<any>({ theme: 'dark' });

  cart = signal<{ items: any[] }>({ items: [] });

  account = signal<any>({
    name: 'John Doe',
    number: 'ACC-123'
  });

  balance = signal<number>(1250.75);

  // derived signals
  isCheckoutEnabled = computed(() =>
    this.cart().items.length > 0 && !!this.users()
  );

  settingsVm = computed(() => ({
    u: this.users(),
    s: this.settings()
  }));

  accountVm = computed(() => ({
    account: this.account(),
    balance: this.balance()
  }));
}
