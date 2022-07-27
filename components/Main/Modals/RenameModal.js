import React, { useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {
    masterUpdateHandler,
    setFileName,
    unsavedChanges,
    setLoading,
    toggleMenu
} from "../../../actions";

//Sub-component of MainModal - gives ability to update file to new name
const RenameModal = (props) => {
    const {
        fileName,
        masterUpdateHandler,
        saveState,
        setFileName,
        unsavedChanges,
        setClose,
        setLoading,
        toggleMenu
    } = props;
    const [newFileName, setNewFileName] = useState(fileName);
    const [error, setError] = useState(false)
    const router = useRouter();

    const handleSubmit = async () => {
        if (!newFileName) { return setError(true) }
        setError(false)
        setClose()
        setLoading(true)

        await masterUpdateHandler(
            saveState,
            'rename',
            {
                oldFN: fileName,
                newFN: newFileName
            }
        )
            .then(() => {
                setFileName(newFileName);
                unsavedChanges(false);
                toggleMenu(false)
                router.push(`/${saveState}/${newFileName}`);
            })
            .catch(() => {
                setLoading(false)
            })
    };

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Typography variant="sideNavHeading" sx={{ color: "black" }}>
                    PICK NEW DOCUMENT NAME
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    value={newFileName}
                    error={error}
                    onChange={(event) => setNewFileName(event.target.value)}
                    aria-label="Type new document name"
                    helperText='Type new doument name'
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "primary.dOrange" }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Grid>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        fileName: state.fileName,
        saveState: state.saveState,
        mdData: state.mdData,
    };
};

export default connect(mapStateToProps, {
    masterUpdateHandler,
    setFileName,
    unsavedChanges,
    setLoading,
    toggleMenu
})(RenameModal);
