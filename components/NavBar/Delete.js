import React from "react";
import { connect } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { setModal, setAlert } from "../../actions";

//Sub component of SaveDeleteContainer - holds delete button and it's functionality
const Delete = (props) => {
    const { setModal, buttonStatus, setAlert } = props;
    const deleteOptions =
        buttonStatus.delete === "new"
            ? () =>
                  setAlert({
                      open: true,
                      message: "You must save first!",
                      severity: "error",
                  })
            : () => setModal({ open: true, type: "delete" });

    return (
        <React.Fragment>
            <IconButton
                onClick={deleteOptions}
                aria-label="Delete file"
                title="Delete file"
                id='delete-btn'
            >
                <DeleteOutlineOutlinedIcon
                    sx={{ color: "primary.vlgray", mr: { xs: 0, sm: 2 }, fontSize: { xs: '40px', sm: '1.5rem' } }}
                />
            </IconButton>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        buttonStatus: state.buttonStatus,
    };
};

export default connect(mapStateToProps, { setModal, setAlert })(Delete);
