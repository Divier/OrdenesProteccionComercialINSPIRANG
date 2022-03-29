import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/pages/login/login.component';
import { PrincipalComponent } from './modules/order/pages/principal/principal.component';

const routes: Routes = [
  {
    path: '',
    //loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    component: PrincipalComponent
  },
  {
    path: 'cargue',
    //loadChildren: () => import('./cargue/cargue.module').then(m => m.CargueModule)
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
