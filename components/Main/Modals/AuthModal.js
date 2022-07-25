import React from "react";
import { connect } from "react-redux";
import { signIn } from 'next-auth/react'
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider'
import { GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons'


import { setAlert } from "../../../actions";

const AuthModal = (props) => {
    const { setClose } = props

    const handleSubmit = async (auth) => {
        if (auth === 'github') {
            await signIn('github').finally(() => setClose())
        } else if (auth === 'google') {
            await signIn('google').finally(() => setClose())
        }
    }

    return (
        <React.Fragment>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant="sideNavHeading" sx={{ color: 'black' }}>CHOOSE YOUR LOGIN</Typography>
            </Grid>
            <Grid item xs={12} sx={{ flexDirection: 'column', rowGap: '10px', mx: 5 }}>
                <GithubLoginButton onClick={() => handleSubmit('github')} />
                <Divider />
                <GoogleLoginButton onClick={() => handleSubmit('google')} />
            </Grid>
        </React.Fragment>
    );
};

export default connect(null, { setAlert })(AuthModal);
