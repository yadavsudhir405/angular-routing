import {NgModule} from '@angular/core';

import {ProductListComponent} from './product-list.component';
import {ProductDetailComponent} from './product-detail.component';
import {ProductEditComponent} from './product-edit/product-edit.component';

import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ProductResolver} from './product-resolver.service';
import {ProductEditInfoComponent} from './product-edit/product-edit-info.component';
import {ProductEditTagsComponent} from './product-edit/product-edit-tags.component';
import {ProductsResolver} from './products-resolver.service';
import {AuthGuard} from '../user/auth-guard.service';
import {ProductEditGuard} from './product-edit/product-edit-guard.service';

const ROUTES = [
  {
    path: 'products',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProductListComponent,
        resolve: {resolvedProducts: ProductsResolver}
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        resolve: {resolvedProduct: ProductResolver}
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
        canDeactivate: [ProductEditGuard],
        resolve: {resolvedProduct: ProductResolver},
        children: [
          {path: '', redirectTo: 'info', pathMatch: 'full'},
          {path: 'info', component: ProductEditInfoComponent},
          {path: 'tags', component: ProductEditTagsComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ]
})
export class ProductModule {
}
