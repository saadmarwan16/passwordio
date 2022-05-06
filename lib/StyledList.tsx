import { List } from "@mui/material";
import { styled } from "@mui/system";

const StyledList = styled(List)({
  width: "100%",
  padding: 0,
  "> li": {
    padding: "8px 0",
  },
  "> li > div": {
    padding: "0px !important",
    right: 0,
  },
});

export default StyledList;
