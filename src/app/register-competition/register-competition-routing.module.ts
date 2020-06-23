import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterCompetitionPage } from './register-competition.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterCompetitionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterCompetitionPageRoutingModule {}
