import { getColorByPokemonType } from "../../utils/getColorByPokemonType";
import { Avatar } from "@mui/material";
import styled from "styled-components";

interface IAvatarProps {
  type: string;
  variant: "card" | "page";
}

export const PokemonAvatar = styled(Avatar)<IAvatarProps>`
  &.MuiAvatar-root {
    width: ${({ variant }) => (variant === "card" ? "80px" : "150px")};
    height: ${({ variant }) => (variant === "card" ? "80px" : "150px")};
    border: ${({ type }) => `3px solid ${getColorByPokemonType(type)}`};
    margin: ${({ variant }) => (variant === "page" ? "20px auto" : "")};
  }
`;
