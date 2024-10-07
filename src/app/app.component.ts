import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';
import { AuthService } from './auth/auth.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { SessionService } from './auth/session.service';

@Component({
  standalone: true,
  imports: [HeaderComponent, RouterModule, NgToastModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'curd-application';

  constructor(private session: SessionService) {}

  ngOnInit(): void {

    this.session.user.next(this.session.userSession())

  }

}
