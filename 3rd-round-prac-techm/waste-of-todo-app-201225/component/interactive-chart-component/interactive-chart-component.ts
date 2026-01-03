import { Component, effect, input, signal } from '@angular/core';
interface ChartData {
  labels: string[];
  values: number[];
  colors: string[];
}
interface Product {
  name: string;
  price: number;
  images: string[];
  reviews: any[];
  reviewCount: number;
}
@Component({
  selector: 'app-interactive-chart-component',
  imports: [],
  templateUrl: './interactive-chart-component.html',
  styleUrl: './interactive-chart-component.scss',
})
export class InteractiveChartComponent {
data = signal<ChartData>({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    values: [120, 190, 300, 250, 400],
    colors: ['#3f51b5', '#ff9800', '#4caf50', '#f44336', '#9c27b0']
  });
//product = input.required<Product>();
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private zoom = signal(false);

  constructor() {
    effect(() => this.renderChart());
  }

  ngOnInit() {
    // Canvas setup would go here with ViewChild
  }

  ngOnDestroy() { }

  renderChart() {
    const data = this.data();
    // Canvas rendering logic for bars, hover effects, tooltips
    // Simulated rendering
    console.log('Rendering chart with data:', data);
  }

  toggleZoom() {
    this.zoom.update(z => !z);
  }

  updateData() {
    this.data.update(d => ({
      ...d,
      values: d.values.map(v => v + Math.floor(Math.random() * 50))
    }));
  }
}
