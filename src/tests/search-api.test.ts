import { fetchPokemon, fetchPokemonList } from '../services/search-api';
import type { PokemonSpecies } from '../types/pokemon';
import { getEnglishDescription } from '../utils/getEnglishDescription';
import { handleResponse } from '../utils/handleResponse';
import { mockPokemon } from './mocks';

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

  it('should fetch pokemon and species and return normalized object', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemon,
    } as Response);

    const result = await fetchPokemon('https://pokeapi.co/api/v2/pokemon/1');

    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      'https://pokeapi.co/api/v2/pokemon/1'
    );

    expect(result).toEqual(mockPokemon);
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
      json: async () => mockPokemon,
    } as Response);

    const query = 'pikachu';
    const offset = 0;
    const limit = 20;

    const result = await fetchPokemonList(query, offset, limit);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('pikachu');
  });

  it('throws error when fetchPokemon fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('network error'));
    const query = 'pikachu';
    const offset = 0;
    const limit = 20;

    await expect(fetchPokemonList(query, offset, limit)).rejects.toThrow(
      'network error'
    );
  });
});
