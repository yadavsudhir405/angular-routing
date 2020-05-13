import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ProductEditComponent} from './product-edit.component';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {

  canDeactivate(component: ProductEditComponent, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
    if (component.isProuctChangesNotSaved()) {
      return confirm('Product changes not saved');
    }
    return true;
  }

}
