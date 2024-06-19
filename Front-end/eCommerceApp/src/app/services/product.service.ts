import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../model/product.model';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUri: string = 'http://localhost:3000/api/products/';

  constructor(private http: HttpClient, private appStateService: AppStateService) { }

  private getAuthHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getProducts(page: number, size: number): Observable<HttpResponse<Product[]>> {
    const url = `${this.baseUri}?_page=${page}&_limit=${size}`;
    return this.http.get<Product[]>(url, { observe: 'response' }).pipe(
      tap(response => {
        this.appStateService.setProductState({
          products: response.body || [],
          totalPages: 1,
          currentPage: page,
          pageSize: size,
          totalProducts: parseInt(response.headers.get('X-Total-Count') || '0', 10),
          keyword: '', // Update based on your filter logic if necessary
          errors: '', // Update based on your error handling logic if necessary
          status: 'success', // Update based on your status logic
          errorMessage: '' // Update based on your error handling logic if necessary
        });
      })
    );
  }

  changeStatus(product: Product): Observable<Product> {
    const url = `${this.baseUri}/${product.id}`;
    return this.http.patch<Product>(url, { isInStock: !product.isInStock }, { headers: this.getAuthHeaders() });
  }

  deleteProduct(product: Product): Observable<any> {
    const url = `${this.baseUri}/${product.id}`;
    return this.http.delete(url, { headers: this.getAuthHeaders() });
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUri, product, { headers: this.getAuthHeaders() });
  }

  searchByKeyword(keyword: string, page: number, size: number): Observable<Product[]> {
    const url = `${this.baseUri}?q=${keyword}&_page=${page}&_limit=${size}`;
    return this.http.get<Product[]>(url);
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.baseUri}/${id}`;
    return this.http.get<Product>(url, { headers: this.getAuthHeaders() });
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.baseUri}/${product.id}`;
    return this.http.put<Product>(url, product, { headers: this.getAuthHeaders() });
  }
}
