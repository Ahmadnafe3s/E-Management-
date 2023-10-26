import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { NgToastModule} from 'ng-angular-popup';
import { EmpService } from './Shared/emp.service';

@Component({
  standalone: true,
  imports: [HeaderComponent , RouterModule , NgToastModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'curd-application';
  constructor(private empService : EmpService){
    empService.FetchData().subscribe()
  }
}
