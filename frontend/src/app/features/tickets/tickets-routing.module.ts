import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketDetailComponent, TicketListComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: TicketListComponent,
  },
  {
    path: ':id',
    component: TicketDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}
