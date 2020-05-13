import {Component, OnInit} from '@angular/core';

import { MessageService } from '../../messages/message.service';

import {Product, ProductResolved} from '../product';
import { ProductService } from '../product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  pageTitle = 'Product Edit';
  errorMessage: string;

  private currentProduct: Product;
  private originalProduct: Product;
  dataIsValid: {[key: string]: boolean} = {};

  constructor(private productService: ProductService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.onProductRetrieved(data['resolvedProduct'].product);
      this.errorMessage = data['resolvedProduct'].error;
    });
  }
  get product(): Product {
    return this.currentProduct;
  }

  set product(product: Product) {
    this.currentProduct = product;
    this.originalProduct = {...product};
  }

  isProuctChangesNotSaved(): boolean {
    return ! (JSON.stringify(this.originalProduct) === JSON.stringify(this.currentProduct));
  }
  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete( `${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () => this.onSaveComplete( `${this.product.productName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  isValid(tab?: string): boolean {
    this.validate();
    if (tab) {
      return this.dataIsValid[tab];
    }

    return (this.dataIsValid) &&
      (Object.keys(this.dataIsValid).every(key => this.dataIsValid[key] === true));
  }

  validate(): void {
    this.dataIsValid = {};
    if (this.product.productName &&
      (this.product.productName.length >= 3) &&
      this.product.productCode) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    if (this.product.category &&
      this.product.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }

  saveProduct(): void {
    if (this.isValid()) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () => {
            this.onSaveComplete(`The new ${this.product.productName} was saved`);
          },
          error: err => this.errorMessage = err
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  reset(): void {
    this.currentProduct = null;
    this.originalProduct = null;
    this.dataIsValid = {};
  }


  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.reset();
    this.router.navigate(['/products']);

    // Navigate back to the product list
  }
}
