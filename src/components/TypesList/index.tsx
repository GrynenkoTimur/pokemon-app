import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { TPokemon } from "@/src/types";

import { TypeName, TypesListInner } from "./TypesList.style";

interface ITypesListProps extends Pick<TPokemon, "types"> {}

export const TypesList: FC<ITypesListProps> = ({ types }) => {
  const navigate = useNavigate();

  return (
    <TypesListInner>
      {types.map(({ type: { name } }) => (
        <TypeName
          key={name}
          onClick={(e: any) => {
            e.stopPropagation();
            navigate("/pokemons", { state: { typeName: name } });
          }}
        >
          {name}
        </TypeName>
      ))}
    </TypesListInner>
  );
};
