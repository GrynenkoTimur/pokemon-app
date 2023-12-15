export const getColorByPokemonType = (type: string): string => {
  switch (type) {
    case "ground":
    case "rock":
      return "brown";

    case "electric":
    case "flying":
      return "yellow";

    case "grass":
    case "poison":
      return "green";

    case "dragon":
    case "fire":
      return "red";

    case "ice":
    case "water":
      return "lightblue";

    case "bug":
    case "fairy":
      return "violet";

    case "fighting":
    case "normal":
    case "unknown":
    case "steel":
    case "psychic":
      return "grey";

    case "ghost":
    case "dark":
    case "shadow":
      return "black";

    default:
      return "transparent";
  }
};
