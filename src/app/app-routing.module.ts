import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../app/modules/auth/login.module').then(m => m.LoginModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('../app/modules/orders/order.module').then(m => m.OrderModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
