import React, { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ButtonBase from "@mui/material/ButtonBase";
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { connect } from "react-redux";

const SaveDelete = (props) => {
    const [visibility, setVisibility] = useState(true);
    const [openSave, setOpenSave] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const router = useRouter();

    const handleSave = () => {
        setOpenSave(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpenSave(false)
        setOpenDelete(false)
    }

    useEffect(() => {
        if (router.pathname.includes("example")) {
            setVisibility(false);
            return;
        }
        setVisibility(true);
    }, [router]);

    return (
        <Grid
            item
            xs={6}
            sx={{
                justifyContent: "flex-end",
                alignItems: "center",
                pr: { xs: 5 },
                contentVisibility: visibility ? "visible" : "hidden",
            }}
        >
            <IconButton>
                <DeleteOutlineOutlinedIcon
                    sx={{ color: "primary.vlgray", mr: 2 }}
                />
            </IconButton>
            <ButtonBase onClick={handleSave} >
                <Image src="/images/save-button.svg" width="150" height="70" />
            </ButtonBase>
            <Snackbar 
                open={openSave}
                autoHideDuration={5000}
                onClose={handleClose}
                message='Document saved'

            >
                <Alert severity="success" sx={{ width: 'fit-content', height: '100px', fontSize: '24px', justifyContent: 'center' }}>Document Saved!</Alert>
            </Snackbar>
        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        mdData: state.mdData
    }
}

export default connect(mapStateToProps)(SaveDelete);
