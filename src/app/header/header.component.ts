import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ConfirmComponent } from '../Shared/confirm/confirm.component';
import { SessionService } from '../auth/session.service';
import { userSessionType } from '../types/type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  open: boolean = false;
  isAuthenticated: userSessionType | null = null;
  message: null | string = null;

  constructor(private authService: AuthService, private session: SessionService , private router : Router) { }

  ngOnInit(): void {

    // checking that isUserAuthenticated

    this.session.user.subscribe({
      next: (user) => {
        this.isAuthenticated = user
      }
    })

  }


  LogOut() {
    this.open = false;
    this.message = 'Do you really want to LogOut..'
  }


  onYes() {
    this.authService.onLogOut()
    this.message = null
   this.router.navigate(['/Auth/logIn']) 
  }


  // canelling model...

  onCancel() {
    this.message = null
  }
}

