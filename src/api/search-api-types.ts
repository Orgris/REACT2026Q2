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

export type PokemonDetailsData = Pokemon & {
  description: string;
};

export interface Pokemon {
  id: number;
  order: number;
  name: string;

  base_experience: number;

  height: number;
  weight: number;

  abilities: PokemonAbility[];

  stats: PokemonStat[];

  species: {
    name: string;
    url: string;
  };

  types: PokemonType[];

  sprites: {
    front_default: string | null;
    other?: {
      showdown?: {
        front_default: string | null;
      };
    };
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}
export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}
