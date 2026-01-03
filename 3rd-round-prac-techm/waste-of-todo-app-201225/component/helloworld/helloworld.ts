import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-helloworld',
  imports: [CommonModule],
  templateUrl: './helloworld.html',
  styleUrl: './helloworld.scss',
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class Helloworld {
name = signal('Angular');
showDetails = false;
details = 'Core info';
toggleDetails(){
this.showDetails = !this.showDetails;
}
}
