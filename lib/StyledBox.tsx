import Box from "@mui/material/Box";
import { styled } from "@mui/system";

export const StyledHorizBox = styled(Box)({
  display: "flex",
  width: "100%",
  gap: 36,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

export const StyledVertBox = styled(Box)({
  display: "flex",
  width: "100%",
  gap: 0,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
});
