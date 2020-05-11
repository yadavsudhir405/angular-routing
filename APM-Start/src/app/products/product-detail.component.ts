import {Component} from '@angular/core';

import {Product, ProductResolved} from './product';
import {ProductService} from './product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private productService: ProductService,
              private readonly route: ActivatedRoute) {

    const resolvedProduct: ProductResolved = this.route.snapshot.data['resolvedProduct'];
    this.onProductRetrieved(resolvedProduct.product);
    this.errorMessage = resolvedProduct.error;
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
