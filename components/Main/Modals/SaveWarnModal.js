import React, { useState } from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { setModal } from "../../../actions";

const SaveWarnModal = (props) => {
    const { setClose, setModal } = props

    return (
        <React.Fragment>
            <Grid item xs={12} sx={{ alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="h4">
                    You will lose saved changes
                </Typography>
                <Typography variant='h4'>
                    Do you still want to proceed?
                </Typography>
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
                    onClick={() => setModal({ type: 'new' })}
                >
                    Create New Doc
                </Button>
            </Grid>
        </React.Fragment>
    )
}

export default connect(null, { setModal })(SaveWarnModal)