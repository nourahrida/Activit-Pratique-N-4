import { Routes } from '@angular/router';
import { NewProductComponent } from "./new-product/new-product.component";
import { ProductsComponent } from "./products/products.component";
import { HomeComponent } from "./home/home.component";
import { EditProductComponent } from "./edit-product/edit-product.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./guards/AuthGuard";
import { RegisterComponent } from "./register/register.component";
import { NotAuthorizedComponent } from "./not-authorized/not-authorized.component";

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "products/new",
    component: NewProductComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: ['admin']
    }
  },
  {
    path: "products/edit/:id",
    component: EditProductComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: ['admin']
    }
  },
  {
    path: "notAuthorized",
    component: NotAuthorizedComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: ['admin', 'user']
    }
  },
  {
    path: "products",
    component: ProductsComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: ['admin', 'user']
    }
  },
  { path: "", redirectTo: "login", pathMatch: "full" }
];
