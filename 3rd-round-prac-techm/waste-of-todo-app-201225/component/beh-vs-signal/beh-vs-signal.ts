import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Subject, takeUntil } from 'rxjs';
import { AccountService } from './account-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export interface User {
  name: string;
  readonly id?: number;
  email: string;
}

interface MyForm {
  foo: FormControl<string>;
  bar: FormControl<string>;
}
@Component({
  selector: 'app-beh-vs-signal',
  imports: [CommonModule],
  templateUrl: './beh-vs-signal.html',
  styleUrl: './beh-vs-signal.scss',
})
export class BehVsSignal {
  user$ = new BehaviorSubject<User | null>(null);
  user = signal<User | null>(null);
  private destroy$ = new Subject<void>();
  private accountService = inject(AccountService);
  vm = this.accountService.accountVm;
  settingsVm = this.accountService.settingsVm;
  isCheckoutEnabled = this.accountService.isCheckoutEnabled;
  userbtos = toSignal(this.user$);
  // form = new FormGroup<MyForm>({
  //   foo: new FormControl('', { nonNullable: true }),
  // });
  forms = new FormGroup<Partial <MyForm>>({
    // bar: new FormControl(0, {
    //   nonNullable: true,
    //   validators: [Validators.required, Validators.min(1)],
    // }),
  });
  constructor() {}

  setUser(user: User) {
    this.user$.next(user);
    this.user.set(user);
  }
  setSigUser(user: User) {}

  /** Enable / Disable checkout button */
  isCheckoutEnabled$ = combineLatest([this.accountService.cart$, this.accountService.user$]).pipe(
    map(([cart, user]) => cart.items.length > 0 && !!user),
    takeUntil(this.destroy$)
  );

  /** Simple VM example */
  settingsVm$ = combineLatest([this.accountService.user$, this.accountService.settings$]).pipe(
    map(([u, s]) => ({ u, s })),
    takeUntil(this.destroy$)
  );

  /** Account summary VM */
  vm$ = combineLatest([this.accountService.account$, this.accountService.balance$]).pipe(
    map(([account, balance]) => ({ account, balance })),
    takeUntil(this.destroy$)
  );

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
