import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DashboardComponent} from "../dashboard/dashboard.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    DashboardComponent
  ],
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router,
    public appState: AppStateService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  searchProducts(keyword: string): void {
    this.appState.setProductState({ status: 'LOADING' });
    this.productService.searchByKeyword(
      keyword,
      this.appState.productState.currentPage,
      this.appState.productState.totalPages
    ).subscribe({
      next: (response) => {
        this.appState.productState.products = response;
        this.appState.setProductState({ status: 'LOADED' });
      },
      error: (error) => {
        console.error('Error searching products:', error);
      }
    });
  }

  handleCheckProduct(product: Product): void {
    this.productService.changeStatus(product).subscribe({
      next: (response) => {
        product.isInStock = !product.isInStock;
      },
      error: (error) => {
        console.error('Error changing product status:', error);
      }
    });
  }

  handleDelete(product: Product): void {
    this.productService.deleteProduct(product).subscribe({
      next: (response) => {
        const index = this.appState.productState.products.findIndex((p: { id: number; }) => p.id === product.id);
        if (index !== -1) {
          this.appState.productState.products.splice(index, 1);
        }
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      }
    });
  }

  getProducts(): void {
    this.productService.getProducts(
      this.appState.productState.currentPage,
      this.appState.productState.pageSize
    ).subscribe({
      next: (responseData) => {
        this.appState.productState.products = responseData.body as Product[];
        const totalProducts = parseInt(responseData.headers.get('x-total-count')!, 10);
        this.appState.productState.totalPages = Math.ceil(totalProducts / this.appState.productState.pageSize);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  paginate(page: number): void {
    this.appState.productState.currentPage = page;
    this.getProducts();
  }

  handleEdit(product: Product): void {
    this.router.navigateByUrl(`/products/edit/${product.id}`);
  }
}
