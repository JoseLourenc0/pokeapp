import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/utils';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'poke-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public pokemons: Pokemon[] = [];
  public isLoading = false;
  private nextCall: string;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.apiService.getPokemons(this.nextCall ? this.nextCall : null).subscribe({
      next: async data => {
        if(data) {
          this.nextCall = data.next;
          const pokemons = await Promise.all((data.results).map(async pokemon => await this.getImageFromPokemon(pokemon.name)));
          this.pokemons.push(...pokemons);
        }
        this.isLoading = false;
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  getImageFromPokemon(pokemonName: string): Promise<Pokemon> {
    return new Promise((resolve) => {
      this.apiService.getPokemonByName(pokemonName).subscribe({
        next: data => {
          resolve({...data, isModalOpen: false});
        }
      });
    });
  }

}
