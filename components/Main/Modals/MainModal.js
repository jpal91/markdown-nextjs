import { connect } from "react-redux";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';

import { setModal } from "../../../actions";
import DeleteModal from "./DeleteModal";
import NewDocModal from "./NewDocModal";
import SaveWarnModal from "./SaveWarnModal";
import AuthModal from "./AuthModal";


const MainModal = (props) => {
    const { setModal, mdData } = props
    const { open, type, redirect } = props.modalStatus;

    const setClass = () => {
        if (type === "delete") {
            return <DeleteModal setClose={handleClose} />;
        } else if (type === 'new') {
            return <NewDocModal setClose={handleClose} />
        } else if (type === 'save-warn') {
            return <SaveWarnModal setClose={handleClose} redirect={redirect}/>
        } else if (type === 'save-new') {
            return <NewDocModal setClose={handleClose} mdData={mdData} />
        } else if (type === 'sign-up' || type === 'login') {
            return <AuthModal setClose={handleClose} type={type} />
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
                <IconButton sx={{ position: 'absolute', top: '5%', left: '85%'}} onClick={handleClose} aria-label='Close dialogue' title='Close dialogue'><CloseIcon/></IconButton>
                <Grid container sx={{ rowGap: '20px' }}>{setClass()}</Grid>
            </Card>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        modalStatus: state.modalStatus,
        mdData: state.mdData
    };
};

export default connect(mapStateToProps, { setModal })(MainModal);

//<Grid container>{setClass()}</Grid>