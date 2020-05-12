import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {ProductService} from './product.service';
import {ProductsResolved} from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<ProductsResolved> {

  constructor(private readonly productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ProductsResolved> {
    return this.productService.getProducts().pipe(
      map(products => ({products})),
      catchError(err => of({products: null, error: err}))
    );
  }
}
