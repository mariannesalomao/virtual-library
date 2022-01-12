import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/readers',
    pathMatch: 'full'
  },
  {
    path: 'readers',
    loadChildren: () => import('./views/readers-list/readers-list.module').then((m) => m.ReadersListModule)
  },
  {
    path: 'reader',
    loadChildren: () => import('./views/readers-form/readers-form.module').then((m)=> m.ReadersFormModule)
  },
  {
    path: 'reader/:id',
    loadChildren: () => import('./views/readers-form/readers-form.module').then((m) => m.ReadersFormModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
