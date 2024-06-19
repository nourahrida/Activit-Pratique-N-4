import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalCheckedProducts: number = 0;

  constructor(public appState: AppStateService) {}

  ngOnInit(): void {
    this.calculateTotalCheckedProducts();
  }

  calculateTotalCheckedProducts(): void {
    this.totalCheckedProducts = this.appState.productState.products.filter(
      (product: any) => product.checked == true
    ).length;
  }
}
