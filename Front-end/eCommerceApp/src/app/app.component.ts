import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {ProductsComponent} from "./products/products.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {AppStateService} from "./services/app-state.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsComponent, RouterOutlet, DashboardComponent, NavBarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My Angular App';
  constructor(protected appStateService: AppStateService) {}
}
