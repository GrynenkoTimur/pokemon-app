import { FC } from "react";
import { AppBar, Container } from "@mui/material";
import { Title } from "../Title";

interface ILayoutProps {
  children: JSX.Element;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div>
      <AppBar position="static">
        <Container>
          <Title variant="h6" component="h1" m="10px 0">
            Pokemon App
          </Title>
        </Container>
      </AppBar>
      <Container>{children}</Container>
    </div>
  );
};
