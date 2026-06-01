import { BASE_URL, endpoints } from '../constants/api';
import type {
  Pokemon,
  PokemonDetailsData,
  PokemonListResponse,
  PokemonSpecies,
} from '../types/pokemon';
import { getEnglishDescription } from '../utils/getEnglishDescription';
import { handleResponse } from '../utils/handleResponse';

export const fetchPokemonList = async (
  query: number | string,
  offset: number,
  limit: number
): Promise<Pokemon[]> => {
  try {
    if (query !== '') {
      const pokemon = await fetchPokemon(
        `${BASE_URL}${endpoints.pokemon}${query + '/'}?limit=${limit}&offset=${offset}`
      );

      return [pokemon];
    }

    const res = await fetch(
      `${BASE_URL}${endpoints.pokemon}?limit=${limit}&offset=${offset}`
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

export const fetchPokemonDetails = async (
  id: string
): Promise<PokemonDetailsData> => {
  const pokemonUrl = `${BASE_URL}${endpoints.pokemon}/${id}/`;

  const pokemonData = await fetchPokemon(pokemonUrl);
  const description = await fetchDescription(pokemonData.species.url);

  return {
    ...pokemonData,
    description,
  };
};

export const fetchPokemon = async (url: string): Promise<Pokemon> => {
  try {
    const pokemonRes = await fetch(url);
    await handleResponse(pokemonRes, 'Pokemon');

    const pokemonData = await pokemonRes.json();

    return pokemonData;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Unknown error while fetching pokemon'
    );
  }
};

export const fetchDescription = async (url: string): Promise<string> => {
  try {
    const speciesRes = await fetch(url);
    await handleResponse(speciesRes, 'pokemon species description');

    const speciesData: PokemonSpecies = await speciesRes.json();

    return getEnglishDescription(speciesData.flavor_text_entries);
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Unknown error while fetching species'
    );
  }
};
