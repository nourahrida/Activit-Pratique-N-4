import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppStateService } from '../services/app-state.service';
import { AuthenticationService } from '../services/authentication.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  actions: Array<any> = [
    { title: "Home", route: "/home", icon: "bi-house" },
    { title: "Products", route: "/products", icon: "bi-cart" },
    { title: "New Product", route: "/products/new", icon: "bi-cart-plus" }
  ];

  currentAction: any;

  constructor(
    public appState: AppStateService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // Initialize currentAction if needed, for example:
    this.currentAction = this.actions[0];
  }

  updateCurrentAction(action: any): void {
    this.currentAction = action;
  }

  logout(): void {
    this.appState.setAuthState({
      isAuthenticated: false,
      roles: undefined,
      token: undefined,
      username: undefined
    });
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  login(): void {
    this.router.navigateByUrl('/login');
  }
}
