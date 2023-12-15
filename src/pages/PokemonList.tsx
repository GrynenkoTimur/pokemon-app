import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  TextField,
} from "@mui/material";

import {
  useGetPokemonsQuery,
  useLazyGetPokemonTypeByIdQuery,
} from "../app/pokemonApi";

import { Loader, PokemonCard, Title, TypeSelect } from "../components";

const limit = 12;

export const PokemonList = () => {
  const state = useLocation().state;
  const navigate = useNavigate();

  const [pokemonName, setPokemonName] = useState("");

  const [page, setPage] = useState(state?.page || 1);
  const [offset, setOffset] = useState(0);

  const [type, setType] = useState<string | null>(state?.typeName || null);

  const [
    getPokemonType,
    {
      data: typeData,
      isLoading: typeLoading,
      error: typeError,
      isFetching: typeFetching,
    },
  ] = useLazyGetPokemonTypeByIdQuery();

  const {
    data: pokemonData,
    isLoading: pokemonLoading,
    error: pokemonError,
  } = useGetPokemonsQuery({
    limit,
    offset,
  });

  useEffect(() => {
    if (type) {
      getPokemonType({ typeIdentifier: type });
    }
  }, [type]);

  useEffect(() => {
    if (state?.typeName) {
      setType(state.typeName);
    }
  }, [state?.typeName]);

  useEffect(() => {
    setOffset((page - 1) * limit);
  }, [page]);

  let content = <div></div>;

  if (pokemonLoading || typeLoading || typeFetching) {
    content = <Loader />;
  }

  if (pokemonError || typeError) {
    content = <div>Error</div>;
  }

  if (pokemonData && !type) {
    const { results, count } = pokemonData;
    const pagesCount = Math.ceil(count / limit);

    content = (
      <>
        <Grid container spacing={2}>
          {results.map(({ name }) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
              <PokemonCard name={name} />
            </Grid>
          ))}
        </Grid>

        <Box m="20px 0" display="flex" justifyContent="center">
          <Pagination
            count={pagesCount}
            page={page}
            onChange={(_, page) => setPage(page)}
            size="medium"
            showFirstButton
            showLastButton
          />
        </Box>
      </>
    );
  }

  if (typeData && type && !typeFetching) {
    const { pokemon } = typeData;

    content = (
      <>
        <Grid container spacing={2}>
          {pokemon.map(({ pokemon: { name } }) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
              <PokemonCard name={name} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  return (
    <div>
      <Title variant="h4" m="20px 0 10px" align="center">
        Chose your Pokemon
      </Title>

      <Box width="100%" maxWidth="300px" m="0 auto">
        <TextField
          size="medium"
          fullWidth
          value={pokemonName}
          sx={{ pr: 0 }}
          onChange={(e) => setPokemonName(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    navigate(`/pokemon/${pokemonName.toLowerCase()}`)
                  }
                  color="primary"
                >
                  <ArrowForward />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" mt="10px">
        <TypeSelect type={type} setType={setType} />
      </Box>
      <Box m="10px 0">
        <Divider />
      </Box>
      {content}
    </div>
  );
};
