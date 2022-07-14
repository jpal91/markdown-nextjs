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
    const { mdData, fileName } = props
    const [visibility, setVisibility] = useState(true);
    const [openSave, setOpenSave] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const router = useRouter();

    const handleSave = () => {
        let localData = localStorage.getItem('localData')
        let fileWOExt = fileName.slice(0, -3)

        if (!localData) {
            let obj = { [`${fileWOExt}`]: { dateCreated: new Date().toLocaleDateString(), data: mdData } }
            localStorage.setItem('localData', JSON.stringify(obj))

        } else if (!localData[`${fileWOExt}`]) {
            localData = JSON.parse(localData)
            localData[`${fileWOExt}`] = { dateCreated: new Date().toLocaleDateString(), data: mdData }
            localStorage.setItem('localData', JSON.stringify(obj))

        } else if (localData[`${fileWOExt}`]) {
            localData = JSON.parse(localData)
            localData[`${fileWOExt}`].data = mdData
            localStorage.setItem('localData', JSON.stringify(localData))
        }

        router.push(`/${fileWOExt}`, undefined, { shallow: true })
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
                <Alert severity="success" sx={{ px: 5 }}>Document Saved!</Alert>
            </Snackbar>
        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        mdData: state.mdData,
        fileName: state.fileName
    }
}

export default connect(mapStateToProps)(SaveDelete);
