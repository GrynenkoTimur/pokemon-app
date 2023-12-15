import { useGetPokemonTypesQuery } from "../../app/pokemonApi";
import { Autocomplete, TextField } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";

interface ITypeSelect {
  type: string | null;
  setType: Dispatch<SetStateAction<string | null>>;
}

export const TypeSelect: FC<ITypeSelect> = ({ type, setType }) => {
  const { data, isLoading, error } = useGetPokemonTypesQuery();

  let content = <div></div>;

  if (isLoading) {
    content = <div>Loading</div>;
  }

  if (error) {
    content = <div>Error</div>;
  }

  if (data) {
    const options = data.results.map(({ name }) => name);

    content = (
      <Autocomplete
        options={options}
        value={type}
        onChange={(_, newType) => setType(newType)}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ width: "300px" }}
            size="small"
            margin="dense"
            label="Pokemon type"
          />
        )}
      />
    );
  }

  return <div>{content}</div>;
};
