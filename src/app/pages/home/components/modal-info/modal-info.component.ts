import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/utils';

@Component({
  selector: 'poke-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
})
export class ModalInfoComponent implements OnInit {

  @Input() pokemonInfo: Pokemon;
  @Input() pokemonSprites: string[] = [];
  public isLoading = false;

  constructor() { }

  ngOnInit() {}

  setOpen(isOpen: boolean) {
    this.pokemonInfo.isModalOpen = isOpen;
  }

  getImages() {
    if(this.pokemonSprites.length === 0) {
      this.isLoading = true;
      this.pokemonSprites = Object.values(this.pokemonInfo.sprites).filter(n=>n && typeof n !== 'object');
    }
    return true;
  }

}
