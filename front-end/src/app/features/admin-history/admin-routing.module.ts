import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHistoryComponent } from './components/admin-history-list/admin-history.component';


const routes: Routes = [
  {
    path: 'history',
    component: AdminHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
