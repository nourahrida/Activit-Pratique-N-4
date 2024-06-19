import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productForm!: FormGroup;
  product!: Product;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      price: this.fb.control('', [Validators.required, Validators.min(0)]),
      description: this.fb.control(''),
      isInStock: this.fb.control(false),
    });
  }

  saveProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched(); // Ensure all fields are touched to display error messages
      return;
    }

    const formValues = this.productForm.value;
    this.product = {
      ...formValues,
      isInStock: !!formValues.isInStock
    };

    this.productService.saveProduct(this.product).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      }
    });
  }
}
