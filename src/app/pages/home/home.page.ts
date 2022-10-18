import { Component, OnInit } from '@angular/core';
import { FavouritePokemon, Pokemon } from 'src/app/models/utils';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ToastService } from 'src/app/shared/services/template/toast/toast.service';

@Component({
  selector: 'poke-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public textFilter = '';
  public filteredPokemons: Pokemon[] = [];
  public pokemons: Pokemon[] = [];
  public isLoading = false;
  public currentFavourites: FavouritePokemon[] = [];
  private nextCall: string;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getData();
    this.setObserverOnDBUpdate();
  }

  async getData() {
    this.isLoading = true;
    this.apiService.getPokemons(this.nextCall ? this.nextCall : null).subscribe({
      next: async data => {
        if(data) {
          this.nextCall = data.next;
          const pokemons = await Promise.all((data.results).map(async pokemon => await this.getDetailedDataFromPokemon(pokemon.name)));
          this.pokemons.push(...pokemons);
          this.filteredPokemons = [...this.pokemons].filter(e => e.name.toUpperCase().includes(this.textFilter.toUpperCase()));
        }
        this.isLoading = false;
        await this.getCurrentFavs();
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  getDetailedDataFromPokemon(pokemonName: string): Promise<Pokemon> {
    return new Promise((resolve) => {
      this.apiService.getPokemonByName(pokemonName).subscribe({
        next: data => {
          resolve({...data, isModalOpen: false});
        }
      });
    });
  }

  setObserverOnDBUpdate() {
    this.storageService.setUsed.subscribe(e => {
      this.getCurrentFavs();
    });
  }

  async saveNewFavourite(pokemonName: string) {
    const isInCurrFav = this.isInCurrentFavourite(pokemonName);
    this.currentFavourites = isInCurrFav ? this.currentFavourites.filter(pokemon => pokemon.name !== pokemonName)
      : [...this.currentFavourites, {name: pokemonName, dateAdded: new Date()}];
    await this.storageService.set('fav-pokemons', [...this.currentFavourites]);
    this.toastService.presentToast(`${isInCurrFav ? 'Desfavoritado' : 'Favoritado'} com Sucesso!`, 'success');
  }

  async getCurrentFavs() {
    const currentFavs = await this.storageService.get('fav-pokemons');
    if(currentFavs) {
      this.currentFavourites = [...currentFavs];
      this.filteredPokemons.forEach(pokemon => pokemon.isFavourite = this.isInCurrentFavourite(pokemon.name));
    }
  }

  isInCurrentFavourite(pokemonName: string) {
    const foundElement = this.currentFavourites.find(e => e.name === pokemonName);
    return foundElement ? true : false;
  }

  doRefresh(event: any) {
    this.getData();
    event.target.complete();
  }

  filterPokemon(event: any) {
    this.textFilter = event.target.value;
    this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.toUpperCase().includes(this.textFilter.toUpperCase()));
    this.getCurrentFavs();
  }

}
