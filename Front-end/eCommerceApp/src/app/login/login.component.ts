import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { AppStateService } from "../services/app-state.service";
import {NgIf} from "@angular/common";
import {NavBarComponent} from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: any;
  formLogin!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
              private loginService: AuthenticationService,
              private appState: AppStateService) {
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control("", Validators.required),
      password: this.fb.control("", Validators.required),
    });
  }

  handleLogin(): void {
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;

    this.loginService.login(username, password).subscribe({
      next: resp => {
        const decodedToken = this.loginService.decodeToken(resp.token);
        if (decodedToken) {
          console.log('Login successful:', resp);
          this.appState.setAuthState({
            isAuthenticated: true,
            role: decodedToken?.isAdmin ? "admin" : "user",
            token: resp.token,
            username:decodedToken?.username
          });
          this.router.navigate(["/home"]).then(r => {
            console.log("To Home");
          });
        } else {
          this.errorMessage = 'Invalid token received';
        }
      },
      error: error => {
        this.errorMessage = error.error.message;
      }
    });
  }
}
