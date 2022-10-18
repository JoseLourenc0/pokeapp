import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritesPageRoutingModule } from './favourites-routing.module';

import { FavouritesPage } from './favourites.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritesPageRoutingModule,
    SharedModule
  ],
  declarations: [FavouritesPage, ModalInfoComponent]
})
export class FavouritesPageModule {}
