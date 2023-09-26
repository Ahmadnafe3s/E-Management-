import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';

@Component({
  standalone: true,
  imports: [HeaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'curd-application';

}
