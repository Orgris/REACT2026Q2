import {
  fetchPokemon,
  fetchPokemonList,
  getCapitalizedName,
  handleResponse,
} from '../api/search-api';
import { getEnglishDescription } from '../api/search-api';
import type { PokemonSpecies } from '../api/search-api-types';

describe('getCapitalizedName', () => {
  it('should capitalize first letter', () => {
    expect(getCapitalizedName('pikachu')).toBe('Pikachu');
  });

  it('should handle single letter', () => {
    expect(getCapitalizedName('p')).toBe('P');
  });

  it('returns empty string', () => {
    expect(getCapitalizedName('')).toBe('');
  });
});

describe('getEnglishDescription', () => {
  const makeEntries = (
    entries: PokemonSpecies['flavor_text_entries']
  ): PokemonSpecies['flavor_text_entries'] => entries;

  it('returns english text from entries', () => {
    const entries = makeEntries([
      {
        flavor_text: 'Hola',
        language: { name: 'es' },
      },
      {
        flavor_text: 'Hello world',
        language: { name: 'en' },
      },
    ]);

    expect(getEnglishDescription(entries)).toBe('Hello world');
  });

  it('replaces new lines and form feeds with spaces', () => {
    const entries = makeEntries([
      {
        flavor_text: 'Hello\nWorld\fTest',
        language: { name: 'en' },
      },
    ]);

    expect(getEnglishDescription(entries)).toBe('Hello World Test');
  });

  it('returns empty string if no english entry exists', () => {
    const entries = makeEntries([
      {
        flavor_text: 'Hola',
        language: { name: 'es' },
      },
    ]);

    expect(getEnglishDescription(entries)).toBe('');
  });
});

describe('handleResponse', () => {
  const makeMockResponse = (status: number): Response =>
    ({
      ok: status >= 200 && status < 300,
      status,
    }) as Response;

  it('should return response if ok', async () => {
    const res = makeMockResponse(200);

    const result = await handleResponse(res, 'pokemon');

    expect(result).toBe(res);
  });

  it('should throw 404 error', async () => {
    const res = makeMockResponse(404);

    await expect(handleResponse(res, 'pokemon')).rejects.toThrow(
      '404: pokemon not found'
    );
  });

  it('should throw 500 error', async () => {
    const res = makeMockResponse(500);

    await expect(handleResponse(res, 'pokemon')).rejects.toThrow(
      '500: Server error while fetching pokemon'
    );
  });

  it('should throw generic error for other statuses', async () => {
    const res = makeMockResponse(403);

    await expect(handleResponse(res, 'pokemon')).rejects.toThrow(
      'Failed to fetch pokemon (status: 403)'
    );
  });
});

describe('fetchPokemon', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const pokemonApiResponse = {
    id: 1,
    order: 1,
    name: 'pikachu',
    species: {
      url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
    },
    sprites: {
      front_default: 'front.png',
      other: {
        showdown: {
          front_default: 'showdown.png',
        },
      },
    },
  };

  const speciesApiResponse = {
    flavor_text_entries: [
      {
        flavor_text: 'Hola',
        language: { name: 'es' },
      },
      {
        flavor_text: 'Test\ndescription',
        language: { name: 'en' },
      },
    ],
  };

  it('should fetch pokemon and species and return normalized object', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => pokemonApiResponse,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => speciesApiResponse,
      } as Response);

    const result = await fetchPokemon('https://pokeapi.co/api/v2/pokemon/1');

    expect(mockFetch).toHaveBeenCalledTimes(2);

    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      'https://pokeapi.co/api/v2/pokemon/1'
    );

    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      pokemonApiResponse.species.url
    );

    expect(result).toEqual({
      id: 1,
      order: 1,
      name: 'Pikachu',
      sprites: {
        front_default: 'front.png',
        other: {
          showdown: {
            front_default: 'showdown.png',
          },
        },
      },
      description: 'Test description',
    });
  });
});

describe('fetchPokemonList', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches single pokemon when query is provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        order: 1,
        name: 'pikachu',
        species: {
          url: 'species-url',
        },
        sprites: {
          front_default: 'front.png',
          other: {
            showdown: {
              front_default: 'showdown.png',
            },
          },
        },
      }),
    } as Response);

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        flavor_text_entries: [
          {
            flavor_text: 'Test',
            language: { name: 'en' },
          },
        ],
      }),
    } as Response);

    const result = await fetchPokemonList('pikachu');

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Pikachu');
  });

  it('throws error when fetchPokemon fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('network error'));

    await expect(fetchPokemonList('pikachu')).rejects.toThrow('network error');
  });
});
