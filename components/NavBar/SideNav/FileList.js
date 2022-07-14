import { useState } from "react";
import { connect } from "react-redux";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const FileList = (props) => {
  const { listName, localData } = props;
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
          {/* <ListItemButton>
            <ListItemText primary="Test" secondary="Thingy" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Test" />
          </ListItemButton> */}
          {Object.keys(localData.docs).map((doc, i) => {
            let targetDoc = localData.docs[doc];

            return (
              <ListItemButton key={i}>
                <ListItemText primary={`${doc}`} secondary={targetDoc.date} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
};

const mapStateToProps = (state) => {
  return {
    localData: state.localData
  };
};

export default connect(mapStateToProps)(FileList);
