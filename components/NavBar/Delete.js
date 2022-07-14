import React, { useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import DeleteModal from "./DeleteModal";
import { updateLocalData, setAlert } from "../../actions";

const Delete = (props) => {
  const { fileName, updateLocalData, localData, setAlert } = props;
  const router = useRouter();
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = () => {
    let fileWOExt = fileName.slice(0, -3);
    let newDataState = { ...localData };

    if (!newDataState.docs[`${fileWOExt}`]) {
      setOpenModal(false);
      setAlert({
        open: true,
        message: "No document saved with this name!",
        severity: "error"
      });
      return;
    } else if (newDataState.docs[`${fileWOExt}`]) {
      delete newDataState.docs[`${fileWOExt}`];
      updateLocalData(newDataState);
    }

    setOpenModal(false);
    router.push("/");
    setAlert({
      open: true,
      message: "Document Deleted!",
      severity: "success"
    });
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={() => setOpenModal(true)}>
        <DeleteOutlineOutlinedIcon sx={{ color: "primary.vlgray", mr: 2 }} />
      </IconButton>
      <DeleteModal
        open={openModal}
        setClose={handleModalClose}
        handleDelete={handleDelete}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    fileName: state.fileName,
    localData: state.localData
  };
};

export default connect(mapStateToProps, { updateLocalData, setAlert })(Delete);
