import { Component, OnInit } from '@angular/core';
import { FavouritePokemon, Pokemon } from 'src/app/models/utils';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ToastService } from 'src/app/shared/services/template/toast/toast.service';

@Component({
  selector: 'poke-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  public filteredPokemons: Pokemon[] = [];
  public pokemons: Pokemon[] = [];
  public favList: FavouritePokemon[] = [];

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getPokemonsOnMemory();
    this.setObserverOnDBUpdate();
  }

  async getPokemonsOnMemory() {
    this.favList = await this.storageService.get('fav-pokemons');
    this.pokemons = await Promise.all(this.favList.map(async pokemon => await this.getDetailedDataFromPokemon(pokemon)));
    this.filteredPokemons = [...this.pokemons];
  }

  getDetailedDataFromPokemon(pokemon: FavouritePokemon): Promise<Pokemon> {
    return new Promise((resolve) => {
      this.apiService.getPokemonByName(pokemon.name).subscribe({
        next: data => {
          resolve({...data, isModalOpen: false, dateAdded: pokemon.dateAdded.toLocaleString()});
        }
      });
    });
  }

  setObserverOnDBUpdate() {
    this.storageService.setUsed.subscribe(e => {
      this.getPokemonsOnMemory();
    });
  }

  async removeFavourite(pokemon: Pokemon) {
    this.favList = this.favList.filter(basicPokemon => basicPokemon.name !== pokemon.name);
    await this.storageService.set('fav-pokemons', [...this.favList]);
    pokemon.isModalOpen = false;
    this.toastService.presentToast('Removido com Sucesso!', 'success');
  }

  async doRefresh(event: any) {
    await this.getPokemonsOnMemory();
    event.target.complete();
  }

  filterPokemon(event: any) {
    this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.toUpperCase().includes(event.target.value.toUpperCase()));
  }
}
