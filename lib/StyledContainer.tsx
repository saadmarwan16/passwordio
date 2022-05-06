import Container from "@mui/material/Container";
import { styled } from "@mui/system";

const StyledContainer = styled(
  Container,
  {}
)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  flexDirection: "column",
  gap: 16,
  paddingTop: 32,
  paddingBottom: 32,
});

export default StyledContainer;
