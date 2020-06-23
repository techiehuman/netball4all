import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterCompetitionPageRoutingModule } from './register-competition-routing.module';

import { RegisterCompetitionPage } from './register-competition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterCompetitionPageRoutingModule
  ],
  declarations: [RegisterCompetitionPage]
})
export class RegisterCompetitionPageModule {}
