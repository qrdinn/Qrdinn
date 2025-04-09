import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: 'userid/:userid/tableid/:tableid',
    component: OrderListComponent,
  },
  // optionally a catch-all route
  { path: '**',component:ErrorComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
