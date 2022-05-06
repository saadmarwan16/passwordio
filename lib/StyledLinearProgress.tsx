import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/system";

const StyledLinearProgress = styled(
  LinearProgress,
  {}
)({
  display: "flex",
  flexGrow: 1,
  height: 10,
  borderRadius: 5,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
  },
});

export default StyledLinearProgress;
