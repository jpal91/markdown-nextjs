import { connect } from "react-redux";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { setModal } from "../../../actions";
import DeleteModal from "./DeleteModal";
import NewDocModal from "./NewDocModal";
import SaveWarnModal from "./SaveWarnModal";
import AuthModal from "./AuthModal";
import RenameModal from "./RenameModal";

//Main component holding the modal
//Adds sub-components based on the Modal type called
const MainModal = (props) => {
    const { setModal, mdData } = props;
    const { open, type, redirect } = props.modalStatus;

    const setClass = () => {
        if (type === "delete") {
            return <DeleteModal setClose={handleClose} />;
        } else if (type === "new") {
            return <NewDocModal setClose={handleClose} />;
        } else if (type === "save-warn") {
            return <SaveWarnModal setClose={handleClose} redirect={redirect} />;
        } else if (type === "save-new") {
            return <NewDocModal setClose={handleClose} mdData={mdData} />;
        } else if (type === "sign-up" || type === "login") {
            return <AuthModal setClose={handleClose} type={type} />;
        } else if (type === "rename") {
            return <RenameModal setClose={handleClose} />;
        }
    };

    const handleClose = () => {
        setModal({ open: false, type: "", redirect: "" });
    };

    return (
        <Modal open={open} onClose={handleClose} closeAfterTransition>
            <Card
                variant="modal"
                sx={{
                    width: { xs: 350, sm: 400 },
                    top: { xs: "25%", sm: "50%" },
                    p: 5,
                }}
            >
                <IconButton
                    sx={{ position: "absolute", top: "5%", left: "85%" }}
                    onClick={handleClose}
                    aria-label="Close dialogue"
                    title="Close dialogue"
                    id="close-modal"
                >
                    <CloseIcon />
                </IconButton>
                <Grid container sx={{ rowGap: "20px" }}>
                    {setClass()}
                </Grid>
            </Card>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        modalStatus: state.modalStatus,
        mdData: state.mdData,
    };
};

export default connect(mapStateToProps, { setModal })(MainModal);
