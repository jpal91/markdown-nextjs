import React, { useState } from "react";
import axios from 'axios'
import { connect } from "react-redux";
import { signIn } from 'next-auth/react'
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonBase from '@mui/material/ButtonBase'
import TextField from "@mui/material/TextField";
import GoogleIcon from '@mui/icons-material/Google';
import Divider from '@mui/material/Divider'
import { GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons'


import { setAlert } from "../../../actions";
import googlePic from '../../../public/images/google-button.png'

const AuthModal = (props) => {
    const { setClose, type, setAlert } = props
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (auth) => {
        if (type === 'sign-up') {
            await axios.post('/api/auth/signup', {
                user: username,
                password: password
            })
                .catch(() => {
                    setClose()
                    setAlert({
                        open: true,
                        message: 'Could not sign up, please try again',
                        severity: 'error'
                    })
                })
        }
        if (auth === 'credentials') {
            await signIn('credentials', { redirect: false, username: username, password: password })
                .then(() => {
                    setClose()
                    setAlert({
                        open: true,
                        message: 'Signed In!',
                        severity: 'success'
                    })
                })
                .catch(() => {
                    setClose()
                    setAlert({
                        open: true,
                        message: 'Could not sign you in!',
                        severity: 'error'
                    })
                })
        } else if (auth === 'github') {
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
            {/* <Grid item xs={12} sx={{ flexDirection: 'column', rowGap: '10px', my: 2}}>
                <TextField
                    fullWidth
                    value={username}
                    label='Username'
                    onChange={(event) => setUserName(event.target.value)}
                />
                <TextField
                    fullWidth
                    value={password}
                    label='Password'
                    onChange={(event) => setPassword(event.target.value)}
                />
            </Grid>
            <Grid
                item
                xs={12}
                sx={{ justifyContent: "space-evenly", maxHeight: "50px" }}
            >
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "blue" }}
                    onClick={setClose}
                >
                    Never mind...
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "red" }}
                    onClick={() => handleSubmit('credentials')}
                >
                    Submit
                </Button>
            </Grid> */}
            <Grid item xs={12} sx={{ flexDirection: 'column', rowGap: '10px', mx: 5 }}>
                {/* <Button variant='contained' onClick={() => handleSubmit('github')}>Github</Button> */}
                {/* <Button variant='contained' onClick={() => handleSubmit('google')} sx={{ backgroundColor: 'white', color: 'black' }}><GoogleIcon/>Google</Button> */}
                <GithubLoginButton onClick={() => handleSubmit('github')} />
                <Divider />
                <GoogleLoginButton onClick={() => handleSubmit('google')} />
            </Grid>
        </React.Fragment>
    );
};

export default connect(null, { setAlert })(AuthModal);
