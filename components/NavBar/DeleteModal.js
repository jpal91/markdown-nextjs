import { useState } from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button'

const DeleteModal = (props) => {
    const { open, setClose, handleDelete } = props;

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
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "normal",
                }}
            >
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h4'>Are you sure you want to delete?</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ justifyContent: 'space-evenly', maxHeight: '50px' }}>
                        <Button
                            variant='contained'
                            sx={{ backgroundColor: 'blue' }}
                            onClick={setClose}
                        >
                            No, cancel
                        </Button>
                        <Button
                            variant='contained'
                            sx={{ backgroundColor: 'red' }}
                            onClick={handleDelete}
                        >
                            Yes, delete
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Modal>
    );
};

export default DeleteModal;
