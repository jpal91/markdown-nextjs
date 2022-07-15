import React from "react";
import { connect } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { setModal } from "../../actions";

const Delete = (props) => {
  const { setModal } = props;

  return (
    <React.Fragment>
      <IconButton onClick={() => setModal({ open: true, type: 'delete' })}>
        <DeleteOutlineOutlinedIcon sx={{ color: "primary.vlgray", mr: 2 }} />
      </IconButton>
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

export default connect(mapStateToProps, { setModal })(Delete);
