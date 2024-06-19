import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink} from "@angular/router";
import { NgIf } from "@angular/common";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
        NgIf
    ],
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerForm: FormGroup;
    errorMessage: string | null = null;

    constructor(private registerService: RegisterService, private router: Router) {
        this.registerForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            const { username, email, password } = this.registerForm.value;
            this.registerService.register(username, email, password)
                .subscribe(
                    response => {
                        console.log('User registered successfully:', response);
                        this.registerForm.reset();
                        this.errorMessage = null; // Clear any previous error messages
                        this.router.navigate(["/login"]).then(() => {});

                    },
                    error => {
                        console.error('Error registering user:', error);
                        this.errorMessage = error.error.message || 'An error occurred during registration'; // Display the error message
                    }
                );
        } else {
            this.registerForm.markAllAsTouched();
        }
    }
}
