import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Box, IconButton } from "@mui/material";

import { ArrowBack } from "@mui/icons-material";

interface IBackButtonProps {
  url: string;
  state?: Record<string, any>;
}

export const BackButton: FC<IBackButtonProps> = ({ url, state }) => {
  const navigate = useNavigate();

  return (
    <Box position="absolute" top="30px" left="0">
      <IconButton size="large" onClick={() => navigate(url, { state })}>
        <ArrowBack fontSize="large" />
      </IconButton>
    </Box>
  );
};
