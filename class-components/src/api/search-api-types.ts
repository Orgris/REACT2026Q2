export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export interface PokemonListResponse {
  results: NamedAPIResource[];
}

export interface Pokemon {
  id: number;
  order: number;
  name: string;

  sprites: {
    front_default: string | null;
    other?: {
      showdown?: {
        front_default: string | null;
      };
    };
  };

  description: string;
}

export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}
