import React, { useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import DeleteModal from "./DeleteModal";
import { updateLocalData, setAlert, deleteFromDB } from "../../actions";

const Delete = (props) => {
  const { fileName, deleteFromDB } = props;
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async () => {
    await deleteFromDB(fileName)
      .then(() => {
        setOpenModal(false);
        router.push("/");
      })
      .catch(() => {
        setOpenModal(false)
      })
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
    localData: state.localData,
    dbData: state.dbData
  };
};

export default connect(mapStateToProps, { updateLocalData, setAlert, deleteFromDB })(Delete);
