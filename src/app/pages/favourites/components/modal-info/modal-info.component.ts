import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/utils';

@Component({
  selector: 'poke-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
})
export class ModalInfoComponent implements OnInit {

  @Input() pokemonInfo: Pokemon;

  constructor() { }

  ngOnInit() {}

  setOpen(isOpen: boolean) {
    this.pokemonInfo.isModalOpen = isOpen;
  }

}
