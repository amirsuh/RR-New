import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserStatsComponent } from "../user-stats-component/user-stats-component";
import { InteractiveChartComponent } from "../interactive-chart-component/interactive-chart-component";

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, MatProgressSpinnerModule, UserStatsComponent, InteractiveChartComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {
retryChart() {
    // Trigger inner defer retry via service or signal
  }
}
