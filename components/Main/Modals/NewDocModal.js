import React, { useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
  createNewDoc,
  toggleMenu,
  unsavedChanges,
  masterUpdateHandler,
  setSaveState
} from "../../../actions";

const NewDocModal = (props) => {
  const {
    setClose,
    createNewDoc,
    toggleMenu,
    unsavedChanges,
    mdData,
    masterUpdateHandler,
    setSaveState,
    saveState,
    authUser
  } = props;
  const router = useRouter();
  const [fileName, setFileName] = useState("");

  const handleSave = async () => {
    const newDoc = {
      fileName: fileName,
      date: new Date().toLocaleDateString(),
      md: mdData ? mdData : ""
    };

    // await createNewDoc(newDoc)
    //     .then(() => {
    //         setClose()
    //         toggleMenu(false)
    //         unsavedChanges(false)
    //         router.push(`/${fileName}`)
    //     })
    //     .catch(() => {
    //         setClose()
    //     })

    await masterUpdateHandler(saveState, "create", newDoc)
      .then(() => {
        setClose();
        toggleMenu(false);
        unsavedChanges(false);
        router.push(`/${fileName}`);
      })
      .catch(() => {
        setClose();
      });
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h4">Name Your New Document</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={fileName}
          onChange={(event) => setFileName(event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <Select
            label="Save Pref"
            value={saveState}
            onChange={(event) => setSaveState(event.target.value)}
          >
            <MenuItem value="local">Local</MenuItem>
            <MenuItem value="db" disabled={!authUser}>
              Database
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ justifyContent: "space-evenly", maxHeight: "50px" }}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "blue" }}
          onClick={setClose}
        >
          Never mind...
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "red" }}
          onClick={handleSave}
        >
          Submit
        </Button>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    saveState: state.saveState,
    authUser: state.authUser
  };
};

export default connect(mapStateToProps, {
  createNewDoc,
  toggleMenu,
  unsavedChanges,
  masterUpdateHandler,
  setSaveState
})(NewDocModal);
