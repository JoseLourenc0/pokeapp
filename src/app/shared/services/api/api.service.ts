import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, retry, shareReplay } from 'rxjs/operators';
import { Pokemon, PokemonRequest } from 'src/app/models/utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private pokemonAPI = environment.pokemonAPI;

  constructor(private http: HttpClient) { }

  getPokemons(url?: string): Observable<PokemonRequest> {
    return this.http.get<PokemonRequest>(url ? url : this.pokemonAPI + '/pokemon').pipe(
      retry(3),
      catchError(() => EMPTY),
      shareReplay()
    );
  }

  getPokemonByName(pokemonName: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.pokemonAPI + '/pokemon/' + pokemonName).pipe(
      retry(3),
      catchError(() => EMPTY),
      shareReplay()
    );
  }
}
