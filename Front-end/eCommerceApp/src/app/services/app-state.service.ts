import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productState: any = {
    keyword: '',
    products: [],
    errors: '',
    page: 1,
    pageSize: 10,
    totalPages: 3,
    currentPage: 1,
    status: '',
    errorMessage: '',
    totalProducts: 0
  };

  public authState: any = {
    username: undefined,
    role: undefined,
    isAuthenticated: false,
    token: undefined
  };

  constructor() { }

  public setProductState(state: any): void {
    this.productState = { ...this.productState, ...state };
  }

  public setAuthState(state: any): void {
    this.authState = { ...this.authState, ...state };
  }
}
