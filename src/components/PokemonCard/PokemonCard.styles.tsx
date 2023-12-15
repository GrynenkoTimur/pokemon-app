import { Card } from "@mui/material";
import styled from "styled-components";

export const CardBody = styled(Card)`
  cursor: pointer;
  transition: all 0.4s;
  &:hover {
    transform: scale(1.07) translateY(-15px);
    box-shadow: 0px 5px 10px grey;
  }
`;

export const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
