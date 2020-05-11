import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ProductResolved} from './product';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ProductService} from './product.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved> {

  constructor(private readonly productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
    const productId = route.paramMap.get('id');
    if (isNaN(+productId)) {
      return of({product: null, error: 'Invalid product id'});
    }
    return this.productService.getProduct(+productId).pipe(
      map(product => ({product})),
      catchError(err => of({product: null, error: err}))
    );
  }

}
