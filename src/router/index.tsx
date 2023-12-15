import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Pokemon, PokemonList } from "../pages";

export const AppRouter = () => {
  const routes = [
    {
      path: "/pokemon/:pokemonId",
      element: <Pokemon />,
    },
    {
      path: "/pokemons",
      element: <PokemonList />,
    },
    {
      path: "*",
      element: <Navigate to="/pokemons" replace={true} />,
    },
  ];

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
