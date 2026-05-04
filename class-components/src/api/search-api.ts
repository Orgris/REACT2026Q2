import type {
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
} from './search-api-types';

const BASE_URL = 'https://pokeapi.co/api/v2/';

const endpoints = {
  pokemon: 'pokemon',
  species: 'pokemon-species',
};

export class SearchApi {
  constructor() {}

  fetchPokemonList = async (query: number | string): Promise<Pokemon[]> => {
    try {
      if (query !== '') {
        const pokemon = await this.fetchPokemon(
          `${BASE_URL}${endpoints.pokemon}/${query}`
        );

        return [pokemon];
      }

      const res = await fetch(`${BASE_URL}${endpoints.pokemon}/${query}`);
      await this.handleResponse(res, 'pokemon list');

      const list: PokemonListResponse = await res.json();

      return Promise.all(
        list.results.map((data) => this.fetchPokemon(data.url))
      );
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Unknown error while fetching pokemon list'
      );
    }
  };

  fetchPokemon = async (url: string): Promise<Pokemon> => {
    try {
      const pokemonRes = await fetch(url);
      await this.handleResponse(pokemonRes, 'Pokemon');

      const pokemonData = await pokemonRes.json();

      const speciesRes = await fetch(pokemonData.species.url);
      await this.handleResponse(speciesRes, 'pokemon species');

      const speciesData: PokemonSpecies = await speciesRes.json();

      return {
        id: pokemonData.id,
        order: pokemonData.order,
        name: this.getCapitalizedName(pokemonData.name),
        sprites: {
          front_default: pokemonData.sprites.front_default,
          other: {
            showdown: {
              front_default:
                pokemonData.sprites.other?.showdown?.front_default ?? null,
            },
          },
        },
        description: this.getEnglishDescription(
          speciesData.flavor_text_entries
        ),
      };
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Unknown error while fetching pokemon'
      );
    }
  };

  getCapitalizedName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  getEnglishDescription = (
    entries: PokemonSpecies['flavor_text_entries']
  ): string => {
    const entry = entries.find((e) => e.language.name === 'en');

    return entry ? entry.flavor_text.replace(/\f|\n/g, ' ') : '';
  };

  handleResponse = async (res: Response, entity: string) => {
    if (res.ok) return res;

    if (res.status === 404) {
      throw new Error(`404: ${entity} not found`);
    }

    if (res.status >= 500) {
      throw new Error(`500: Server error while fetching ${entity}`);
    }

    throw new Error(`Failed to fetch ${entity} (status: ${res.status})`);
  };
}
