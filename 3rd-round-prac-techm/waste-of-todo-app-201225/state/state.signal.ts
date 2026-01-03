import { signal, computed } from '@angular/core';

export const counterState = signal(0);
export const doubled = computed(() => counterState() * 2);
