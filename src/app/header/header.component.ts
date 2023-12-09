import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map, take } from 'rxjs';
import { ConfirmComponent } from '../Shared/confirm/confirm.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  open: boolean = false;
  Authenticated: boolean;
  message: null | string = null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.UserSubject.subscribe(user => {
      this.Authenticated = !!user;
    })
  }

  LogOut() {
    this.open = false;
    this.message = 'Do you really want to LogOut..'
  }

  onYes() {
    this.authService.onLogOut()
    this.message = null
  }

  onCancel() {
    this.message = null
  }
}

