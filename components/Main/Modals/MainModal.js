import { connect } from "react-redux";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { setModal } from "../../../actions";
import DeleteModal from "./DeleteModal";
import NewDocModal from "./NewDocModal";
import SaveWarnModal from "./SaveWarnModal";


const MainModal = (props) => {
    const { setModal } = props
    const { open, type } = props.modalStatus;

    const setClass = () => {
        if (type === "delete") {
            return <DeleteModal setClose={handleClose} />;
        } else if (type === 'new') {
            return <NewDocModal setClose={handleClose} />
        } else if (type === 'save-warn') {
            return <SaveWarnModal setClose={handleClose} />
        }

    };

    const handleClose = () => {
        setModal({ open: false })
    }

    return (
        <Modal open={open} onClose={handleClose} closeAfterTransition>
            <Card
                sx={{
                    position: "absolute",
                    width: 400,
                    minHeight: 250,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    p: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "normal",
                }}
            >
                <Grid container>{setClass()}</Grid>
            </Card>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        modalStatus: state.modalStatus,
    };
};

export default connect(mapStateToProps, { setModal })(MainModal);

//<Grid container>{setClass()}</Grid>