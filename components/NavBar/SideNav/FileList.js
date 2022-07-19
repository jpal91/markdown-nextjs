import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { toggleMenu } from "../../../actions";

const FileList = (props) => {
  const { listName, dbData, toggleMenu, localData } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [directoryData, setDirectory] = useState();
  const handleOpen = () => setOpen(!open);
  const directory = async () =>
    await axios.get("/api/examples").then((res) => setDirectory(res.data));

  useEffect(() => {
    if (listName === "My Files") {
      return;
    }
    directory();
  }, []);

  const buildList = () => {
    if (listName === "My Files") {
      const dbDataKeys = Object.keys(dbData.docs);
      const localDataKeys = Object.keys(localData.docs);

      return (
        dbDataKeys &&
        dbDataKeys.map((doc, i) => {
          let targetDoc = dbData.docs[doc] || localData.docs[doc];

          return (
            <ListItemButton
              key={i}
              onClick={() => {
                toggleMenu(false);
                setOpen(false);
                router.push(`/db/${doc}`);
              }}
            >
              <ListItemText primary={`${doc}`} secondary={targetDoc.date} />
            </ListItemButton>
          );
        }) + localDataKeys &&
        localDataKeys.map((doc, i) => {
          let targetDoc = localData.docs[doc];

          return (
            <ListItemButton
              key={i}
              onClick={() => {
                toggleMenu(false);
                setOpen(false);
                router.push(`/local/${doc}`);
              }}
            >
              <ListItemText primary={`${doc}`} secondary={targetDoc.date} />
            </ListItemButton>
          );
        })
      );
    } else if (listName === "Examples") {
      if (!directoryData) {
        return;
      }
      return directoryData.map((file, i) => {
        file = file.replace(/\.md/, "");

        return (
          <ListItemButton
            key={i}
            onClick={() => {
              toggleMenu(false);
              setOpen(false);
              router.push(`/example/${file}`);
            }}
          >
            <ListItemText primary={file} />
          </ListItemButton>
        );
      });
    }
  };

  return (
    <React.Fragment>
      <List sx={{ width: "100%", color: "white" }}>
        <ListItemButton onClick={handleOpen}>
          <ListItemText primary={listName} />
          {open ? <ExpandMore /> : <ExpandLess />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" sx={{ pl: 4 }}>
            {buildList()}
          </List>
        </Collapse>
      </List>
      {/* <Backdrop open={loading}>
                <CircularProgress sx={{ color: "primary.text" }} />
            </Backdrop> */}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    localData: state.localData,
    dbData: state.dbData
  };
};

export default connect(mapStateToProps, { toggleMenu })(FileList);

// {Object.keys(dbData.docs).map((doc, i) => {
//     let targetDoc = dbData.docs[doc];

//     return (
//         <ListItemButton key={i}>
//             <ListItemText
//                 primary={`${doc}`}
//                 secondary={targetDoc.date}
//             />
//         </ListItemButton>
//     );
// })}
