import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TabsMenuComponent } from './components/tabs-menu/tabs-menu.component';
import { PokeCardComponent } from './components/poke-card/poke-card.component';

@NgModule({
  declarations: [
    TabsMenuComponent,
    PokeCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    TabsMenuComponent,
    PokeCardComponent
  ]
})
export class SharedModule { }
