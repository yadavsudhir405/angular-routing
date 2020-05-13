import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {WelcomeComponent} from './home/welcome.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {AuthGuard} from './user/auth-guard.service';
import {SelectiveStrategy} from './selective-strategy.service';

const ROUTES = [
  {path: 'welcome', component: WelcomeComponent},
  {
    path: 'products',
    data: {preload: true},
    canActivate: [AuthGuard],
    loadChildren: () => import('./products/product.module').then(m => m.ProductModule),
  },
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      preloadingStrategy: SelectiveStrategy
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
