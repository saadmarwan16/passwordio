import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { FC } from "react";

interface Props {
    checked: boolean,
    primary: string,
    onClick: () => void,
}

const PasswordFeaturesList: FC<Props> = ({checked, primary, onClick}: Props) => (
  <ListItem
    secondaryAction={
      <IconButton edge="end" aria-label={primary} onClick={() => onClick()}>
        <Switch checked={checked} inputProps={{"aria-label": primary}} />
      </IconButton>
    }
  >
    <ListItemButton onClick={() => onClick()}>
      <ListItemText primary={primary} />
    </ListItemButton>
  </ListItem>
);

export default PasswordFeaturesList;