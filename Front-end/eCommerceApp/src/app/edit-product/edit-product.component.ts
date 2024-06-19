import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Product} from "../model/product.model";
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{

  editedProduct!: Product;
  productId!: number ;
  productForm!: FormGroup;
  ngOnInit(): void {

    this.productId = this.activatedRoute.snapshot.params["id"];
    this.productService.getProduct(this.productId).subscribe({
      next: product => {
        this.productForm = this.fb.group(
          {
            id: this.fb.control(product.id),
            name: this.fb.control(product.name ? product.name : "", Validators.required),
            price: this.fb.control(product.price ? product.price : ""),
            checked: this.fb.control(product.isInStock ? product.isInStock : ""),
          }
        );
      }
    })


  }

  constructor(private fb: FormBuilder, private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) {


  }

  saveProduct() {

    console.log("HYY");
    let product = this.productForm.value;
    this.productService.updateProduct(product).subscribe({
      next: (response: any) => {
        this.router.navigate(["/products"]);
      }

    });
  }
}
