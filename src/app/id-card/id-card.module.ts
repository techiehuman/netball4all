import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdCardPageRoutingModule } from './id-card-routing.module';

import { IdCardPage } from './id-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdCardPageRoutingModule
  ],
  declarations: [IdCardPage]
})
export class IdCardPageModule {}
