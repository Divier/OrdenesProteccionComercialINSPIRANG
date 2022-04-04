import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'order',
        component: PrincipalComponent
      },
      {
        path: '**',
        redirectTo: 'order'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderRoutingModule { }
