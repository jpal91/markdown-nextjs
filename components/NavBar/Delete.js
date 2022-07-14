import React, { useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import IconButton from '@mui/material/IconButton'
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import DeleteModal from "./DeleteModal";
import { updateLocalData } from '../../actions'

const Delete = (props) => {
    const { fileName, updateLocalData, localData } = props;
    const router = useRouter()
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const handleDelete = () => {
        // let localData = localStorage.getItem("localData");
        let fileWOExt = fileName.slice(0, -3);
        // localData = JSON.parse(localData);
        let newDataState = { ...localData }

        // if (!localData || !localData[`${fileWOExt}`]) {
        //     setOpenModal(false)
        //     setOpenErrorAlert(true)
        //     return
        // } else if (localData[`${fileWOExt}`]) {
        //     delete localData[`${fileWOExt}`];
        //     localStorage.setItem("localData", JSON.stringify(localData));
        // }

        if (!newDataState.docs[`${fileWOExt}`]) {
            setOpenModal(false)
            setOpenErrorAlert(true)
            return
        } else if (newDataState.docs[`${fileWOExt}`]) {
            delete newDataState.docs[`${fileWOExt}`];
            updateLocalData(newDataState)
        }


        setOpenModal(false)
        router.push("/");
        setOpenDeleteAlert(true);
    };

    const handleModalClose = () => {
        setOpenModal(false)
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') { return }
        setOpenDeleteAlert(false)
        setOpenErrorAlert(false)
    }

    return (
        <React.Fragment>
            <IconButton onClick={() => setOpenModal(true)}>
                <DeleteOutlineOutlinedIcon
                    sx={{ color: "primary.vlgray", mr: 2 }}
                />
            </IconButton>
            <Snackbar 
                open={openDeleteAlert}
                autoHideDuration={5000}
                onClose={handleAlertClose}
            >
                <Alert severity="success" sx={{ px: 5 }}>Document Deleted!</Alert>
            </Snackbar>
            <Snackbar 
                open={openErrorAlert}
                autoHideDuration={5000}
                onClose={handleAlertClose}
            >
                <Alert severity="error" sx={{ px: 5 }}>No Document Saved!</Alert>
            </Snackbar>
            <DeleteModal open={openModal} setClose={handleModalClose} handleDelete={handleDelete} />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        fileName: state.fileName,
        localData: state.localData
    };
};

export default connect(mapStateToProps, { updateLocalData })(Delete);
