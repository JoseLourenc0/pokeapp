import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss'],
})
export class PokeCardComponent implements OnInit {

  @Input() title?: string;
  @Input() description?: string;
  @Input() image?: string;
  @Input() imageStyle?: string = '';
  @Input() imageAlt?: string;
  @Input() isLoading = false;

  constructor() { }

  ngOnInit() {}

}
