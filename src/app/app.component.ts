import {Component, inject} from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { HeaderComponent } from './pages/layout/header/header.component';
import { SidebarComponent } from './pages/layout/sidebar/sidebar.component';
import { Store } from '@ngrx/store';


@Component({
    selector: 'app-root',
    imports: [ RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
test ="dafdsfdsfd"

constructor(private store: Store<{ godown: any[] }>){
}

}
