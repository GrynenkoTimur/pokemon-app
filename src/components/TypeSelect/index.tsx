import { Dispatch, FC, SetStateAction } from "react";
import { Autocomplete, Skeleton, TextField } from "@mui/material";
import { useGetPokemonTypesQuery } from "../../app/pokemonApi";

interface ITypeSelect {
  type: string | null;
  setType: Dispatch<SetStateAction<string | null>>;
}

export const TypeSelect: FC<ITypeSelect> = ({ type, setType }) => {
  const { data, isLoading, error } = useGetPokemonTypesQuery();

  let content = <div></div>;

  if (isLoading) {
    content = <Skeleton variant="rounded" width={300} height={40} />;
  }

  if (error) {
    content = <div>Oooops something went wrong while requesting types</div>;
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
