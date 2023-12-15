import { Fragment } from "react";
import { useParams } from "react-router-dom";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import { useGetPokemonByIdQuery } from "../app/pokemonApi";

import { BackButton, Loader, PokemonAvatar, Title, TypesList } from "../components";

export const Pokemon = () => {
  const { pokemonId } = useParams();

  const { data, isLoading, error } = useGetPokemonByIdQuery({
    pokemonIdentifier: pokemonId as string,
  });

  let content = <div></div>;

  if (isLoading) {
    content = <Loader />;
  }

  if (error) {
    content = (
      <>
        <BackButton url="/pokemons" />

        <Box>
          <PokemonAvatar src={""} type={""} variant="page" />

          <Title variant="h4" align="center">
            {"originalStatus" in error && error?.originalStatus === 404
              ? "No such Pokemon"
              : "Oooops something went wrong"}
          </Title>
        </Box>
      </>
    );
  }

  if (data) {
    const { id, name, weight, height, sprites, types, abilities, moves } = data;

    const accordionsData: {
      id: string;
      items: { name: string; size?: number }[];
    }[] = [
      {
        id: "Sizes",
        items: [
          { name: "Weight", size: weight },
          { name: "Height", size: height },
        ],
      },
      {
        id: `Abilities: ${abilities.length}`,
        items: abilities.map(({ ability }) => ({
          name: ability.name,
        })),
      },
      {
        id: `Moves: ${moves.length}`,
        items: moves.map(({ move }) => ({
          name: move.name,
        })),
      },
    ];

    content = (
      <>
        <BackButton url="/pokemons" state={{ page: Math.ceil(id / 12) }} />

        <PokemonAvatar
          src={sprites?.front_default || ""}
          type={types[0].type.name}
          variant="page"
        />

        <Title variant="h4" align="center" gutterBottom noWrap>
          {name}
        </Title>

        <Box m="10px 0" display="flex" justifyContent="center">
          <TypesList types={types} />
        </Box>

        {accordionsData.map(({ id, items }) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Title variant="h6">{id}</Title>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {items.map(({ name, size }) => (
                  <Fragment key={name}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <Title variant="subtitle1">
                          {`${name} ${size ? `: ${size}` : ""}`}
                        </Title>
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </Fragment>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </>
    );
  }

  return <Box position="relative">{content}</Box>;
};
