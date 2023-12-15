import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  GetPokemonByIdInput,
  GetPokemonTypeByIdInput,
  RequestWithPagination,
  ResponseWithPagination,
  TPokemon,
  TPokemonType,
  TShortPokemon,
  TShortPokemonType,
} from "../../types";
import { ENDPOINTS } from "../endpoints";

export const pokemonApi = createApi({
  reducerPath: "pokemon/api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_POKEMON_API_URL,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }),
  endpoints: (build) => ({
    getPokemons: build.query<
      ResponseWithPagination<TShortPokemon>,
      RequestWithPagination
    >({
      query: ({ limit, offset }) => ({
        url: ENDPOINTS.POKEMON.LIST,
        params: { limit, offset },
      }),
    }),
    getPokemonById: build.query<TPokemon, GetPokemonByIdInput>({
      query: ({ pokemonIdentifier }) => ({
        url: ENDPOINTS.POKEMON.DETAILS(pokemonIdentifier),
      }),
    }),
    getPokemonTypes: build.query<
      ResponseWithPagination<TShortPokemonType>,
      void
    >({
      query: () => ({
        url: ENDPOINTS.TYPE.LIST,
      }),
    }),
    getPokemonTypeById: build.query<TPokemonType, GetPokemonTypeByIdInput>({
      query: ({ typeIdentifier }) => ({
        url: ENDPOINTS.TYPE.DETAILS(typeIdentifier),
      }),
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonByIdQuery,
  useGetPokemonTypesQuery,
  useLazyGetPokemonTypeByIdQuery,
} = pokemonApi;
