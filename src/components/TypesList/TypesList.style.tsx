import styled from "styled-components";
import { Title } from "../Title";

export const TypesListInner = styled.div`
  display: flex;
`;

export const TypeName = styled(Title)`
  cursor: pointer;
  display: flex;
  color: #888888;
  &:after {
    content: " • ";
    padding: 0 5px;
    display: block;
  }

  &:last-of-type {
    &:after {
      content: none;
    }
  }
`;
