import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Add HttpClientModule if you're using HTTP requests

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; // Adjust path as per your project
import { RegisterService } from './services/register.service'; // Adjust path as per your project

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      // Add other routes as needed
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, // Add HttpClientModule here if you're using HTTP requests
  ],
  providers: [RegisterService],
  bootstrap: []
})
export class AppModule { }
