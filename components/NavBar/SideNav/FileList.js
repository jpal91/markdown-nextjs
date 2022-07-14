import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const FileList = (props) => {
  const { listName } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <List sx={{ width: "100%", color: "white" }}>
      <ListItemButton onClick={handleOpen}>
        <ListItemText primary={listName} />
        {open ? <ExpandMore /> : <ExpandLess />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" sx={{ pl: 4 }}>
          <ListItemButton>
            <ListItemText primary="Test" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Test" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

export default FileList;
