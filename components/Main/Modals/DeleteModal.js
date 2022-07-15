import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { deleteFromDB } from "../../../actions";

const DeleteModal = (props) => {
    const { setClose, deleteFromDB, fileName } = props
    const router = useRouter()

    const handleDelete = async () => {
        await deleteFromDB(fileName)
          .then(() => {
            setClose();
            router.push("/");
          })
          .catch(() => {
            setClose()
          })
      };
    
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

const mapStateToProps = (state) => {
    return {
        fileName: state.fileName
    }
}

export default connect(mapStateToProps, { deleteFromDB })(DeleteModal)