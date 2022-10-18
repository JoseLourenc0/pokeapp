/* eslint-disable @typescript-eslint/naming-convention */
export interface BasicPokemonInfo {
  name: string;
  url: string;
}

export interface PokemonRequest {
  count: number;
  next: string;
  previous: null | string;
  results: BasicPokemonInfo[];
}

export interface BasicSpriteSet {
  back_default: string;
  front_default: string;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: BasicSpriteSet;
  weight: number;
  height: number;
}
