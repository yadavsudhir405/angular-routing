import {Component, OnInit} from '@angular/core';

import { AuthService } from './user/auth.service';
import {Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError
} from '@angular/router';
import {slideInAnimation} from './app.animation';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  isLoading = false;

  constructor(private authService: AuthService, private readonly router: Router) {
    this.router.events.subscribe((event: Event) => {
      this.handleRouterEvent(event);
    });
  }

  handleRouterEvent(event: Event) {
    if (event instanceof NavigationStart) {
      this.isLoading = true;
    }

    if (event instanceof NavigationEnd ||
    event instanceof  NavigationError ||
    event instanceof  NavigationCancel) {
      this.isLoading = false;
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }
}
