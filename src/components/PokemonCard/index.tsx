import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CardContent, Skeleton } from "@mui/material";

import { TPokemon } from "@/src/types";
import { useGetPokemonByIdQuery } from "../../app/pokemonApi";

import { TypesList } from "../TypesList";
import { PokemonAvatar } from "../PokemonAvatar";
import { Title } from "../Title";

import { CardBody, CardInner } from "./PokemonCard.styles";

interface IPokemonCardProps extends Pick<TPokemon, "name"> {}

export const PokemonCard: FC<IPokemonCardProps> = memo(({ name }) => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetPokemonByIdQuery({
    pokemonIdentifier: name,
  });

  let content = <div></div>;

  if (isLoading) {
    content = (
      <CardInner>
        <Skeleton variant="circular" height={75} width={75} />

        <Box mb="7px">
          <Skeleton variant="text" height={34} width={105} />
        </Box>

        <Skeleton variant="text" height={28} width={60} />
      </CardInner>
    );
  }

  if (error) {
    content = (
      <CardInner>
        <PokemonAvatar src={""} type={""} variant="card" />

        <Title variant="h6" noWrap gutterBottom>
          Ooops something went wrong
        </Title>
      </CardInner>
    );
  }

  if (data) {
    content = (
      <CardInner>
        <PokemonAvatar
          src={data.sprites?.front_default || ""}
          type={data.types[0].type.name}
          variant="card"
        />

        <Title variant="h6" noWrap gutterBottom>
          {data.name}
        </Title>

        <TypesList types={data.types} />
      </CardInner>
    );
  }

  return (
    <CardBody variant="outlined" onClick={() => navigate(`/pokemon/${name}`)}>
      <CardContent>{content}</CardContent>
    </CardBody>
  );
});
