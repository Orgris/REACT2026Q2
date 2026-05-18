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

export const fetchPokemonList = async (
  query: number | string,
  offset: number,
  limit: number
): Promise<Pokemon[]> => {
  try {
    if (query !== '') {
      const pokemon = await fetchPokemon(
        `${BASE_URL}${endpoints.pokemon}/${query + '/'}?limit=${limit}&offset=${offset}`
      );

      return [pokemon];
    }

    const res = await fetch(
      `${BASE_URL}${endpoints.pokemon}/?limit=${limit}&offset=${offset}`
    );
    await handleResponse(res, 'pokemon list');

    const list: PokemonListResponse = await res.json();

    return Promise.all(list.results.map((data) => fetchPokemon(data.url)));
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Unknown error while fetching pokemon list'
    );
  }
};

export const fetchPokemon = async (url: string): Promise<Pokemon> => {
  try {
    const pokemonRes = await fetch(url);
    await handleResponse(pokemonRes, 'Pokemon');

    const pokemonData = await pokemonRes.json();

    const speciesRes = await fetch(pokemonData.species.url);
    await handleResponse(speciesRes, 'pokemon species');

    const speciesData: PokemonSpecies = await speciesRes.json();

    return {
      id: pokemonData.id,
      order: pokemonData.order,
      name: getCapitalizedName(pokemonData.name),
      sprites: {
        front_default: pokemonData.sprites.front_default,
        other: {
          showdown: {
            front_default:
              pokemonData.sprites.other?.showdown?.front_default ?? null,
          },
        },
      },
      description: getEnglishDescription(speciesData.flavor_text_entries),
    };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Unknown error while fetching pokemon'
    );
  }
};

export const getCapitalizedName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const getEnglishDescription = (
  entries: PokemonSpecies['flavor_text_entries']
): string => {
  const entry = entries.find((e) => e.language.name === 'en');

  return entry ? entry.flavor_text.replace(/\f|\n/g, ' ') : '';
};

export const handleResponse = async (res: Response, entity: string) => {
  if (res.ok) return res;

  if (res.status === 404) {
    throw new Error(`404: ${entity} not found`);
  }

  if (res.status >= 500) {
    throw new Error(`500: Server error while fetching ${entity}`);
  }

  throw new Error(`Failed to fetch ${entity} (status: ${res.status})`);
};
