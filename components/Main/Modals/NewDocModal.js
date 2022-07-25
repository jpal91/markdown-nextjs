import React, { useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonBase from '@mui/material/ButtonBase'
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
import createButton from '../../../public/images/create-new.svg'

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
        router.push(`/${saveState}/${fileName}`);
      })
      .catch(() => {
        setClose();
      });
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="sideNavHeading" sx={{ color: 'black' }}>NAME YOUR DOCUMENT</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={fileName}
          onChange={(event) => setFileName(event.target.value)}
          aria-label='Type new document name'
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl aria-label='Select save type'>
          <Select
            
            value={saveState}
            onChange={(event) => setSaveState(event.target.value)}
            aria-label='Select save type'
          >
            <MenuItem value="local" aria-label='Save in local storage' sx={{ color: 'black'}}>Local</MenuItem>
            <MenuItem value="db" disabled={!authUser} aria-label='Save to database' sx={{ color: 'black'}}>
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
        {/* <Button
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
        </Button> */}
        <ButtonBase onClick={handleSave} sx={{ '&:hover': { opacity: '0.9' }}}>
          <Image src={createButton} alt='Create new document'/>
        </ButtonBase>
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
