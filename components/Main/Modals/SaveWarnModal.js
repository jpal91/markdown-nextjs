import React from "react";
import { connect } from "react-redux";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { setModal } from "../../../actions";
import proceedButton from '../../../public/images/proceed.svg'

const SaveWarnModal = (props) => {
    const { setModal, redirect } = props

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
                <ButtonBase onClick={() => setModal({ type: redirect })} sx={{ '&:hover': { opacity: '0.9' }}}>
                    <Image src={proceedButton} alt='Proceed'/>
                </ButtonBase>
            </Grid>
        </React.Fragment>
    )
}

export default connect(null, { setModal })(SaveWarnModal)