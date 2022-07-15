import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const DeleteModal = (props) => {
    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Typography variant="h4">
                    Are you sure you want to delete?
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
                    No, cancel
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "red" }}
                    onClick={handleDelete}
                >
                    Yes, delete
                </Button>
            </Grid>
        </React.Fragment>
    );
};

export default DeleteModal