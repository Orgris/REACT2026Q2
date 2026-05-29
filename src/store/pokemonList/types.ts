import type { Pokemon } from '../../types/pokemon';

export type FetchPokemonsArgs = {
  query: string;
  page: number;
};

export interface PokemonListState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;

  currentRequestId?: string;
}
