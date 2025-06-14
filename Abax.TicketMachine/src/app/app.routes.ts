import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tickets',
    loadComponent: () => import("../app/tickets/train-tickets/train-tickets.component").then((m => m.TrainTicketsComponent))
  }
];
