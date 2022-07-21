import React, { useState } from "react";
import { connect } from "react-redux";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonBase from '@mui/material/ButtonBase'

import { setModal } from "../../../actions";
import proceedButton from '../../../public/images/proceed.svg'

const SaveWarnModal = (props) => {
    const { setClose, setModal } = props

    return (
        <React.Fragment>
            <Grid item xs={12} sx={{ alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="sideNavHeading" sx={{ color: 'black' }}>
                    YOU WILL LOSE SAVED CHANGES
                </Typography>
                <Typography variant='sideNavHeading' sx={{ color: 'black' }}>
                    DO YOU STILL WISH TO PROCEED?
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sx={{ justifyContent: "space-evenly", maxHeight: "50px" }}
            >
                {/* <Button
                    variant="contained"
                    sx={{ backgroundColor: "blue" }}
                    onClick={setClose}
                >
                    Never mind...
                </Button> */}
                {/* <Button
                    variant="contained"
                    sx={{ backgroundColor: "red" }}
                    onClick={() => setModal({ type: 'new' })}
                >
                    Create New Doc
                </Button> */}
                <ButtonBase onClick={() => setModal({ type: 'new' })} sx={{ '&:hover': { opacity: '0.9' }}}>
                    <Image src={proceedButton} alt='Proceed'/>
                </ButtonBase>
            </Grid>
        </React.Fragment>
    )
}

export default connect(null, { setModal })(SaveWarnModal)