export const ENDPOINTS = {
  POKEMON: {
    LIST: "pokemon",
    DETAILS: (pokemonIdentifier: number | string) =>
      `pokemon/${pokemonIdentifier}`,
  },
  TYPE: {
    LIST: "type",
    DETAILS: (typeIdentifier: number | string) => `type/${typeIdentifier}`,
  },
};
