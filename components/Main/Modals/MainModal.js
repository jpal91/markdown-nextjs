import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import DeleteModal from "./DeleteModal";

const MainModal = (props) => {
    const { open, currentClass } = props;

    const setClass = () => {
        if (currentClass === 'delete') {
            return <DeleteModal />
        } else if (currentClass === 'new') {

        }
    }

    return (
        <Modal open={open} onClose={setClose} closeAfterTransition>
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
                <Grid container>
                    {setClass}
                </Grid>
            </Card>
        </Modal>
    );
};

export default MainModal;
