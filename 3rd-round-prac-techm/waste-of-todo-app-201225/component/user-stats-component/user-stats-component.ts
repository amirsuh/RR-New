import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
interface Stat {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
}
@Component({
  selector: 'app-user-stats-component',
  imports: [CommonModule, MatCardModule, MatProgressBarModule],
  templateUrl: './user-stats-component.html',
  styleUrl: './user-stats-component.scss',
})
export class UserStatsComponent {
stats = computed(() => [
    { label: 'Total Users', value: 12456, change: 12, trend: 'up' as const },
    { label: 'Active Today', value: 2345, change: 8, trend: 'up' as const },
    { label: 'New Users', value: 567, change: 23, trend: 'up' as const },
    { label: 'Retention', value: 78, change: -2, trend: 'down' as const }
  ]);
}
