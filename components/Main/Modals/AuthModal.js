import React, { useState } from "react";
import axios from 'axios'
import { connect } from "react-redux";
import { signIn } from 'next-auth/react'
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


import { setAlert } from "../../../actions";

const AuthModal = (props) => {
    const { setClose, type, setAlert } = props
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
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
    }

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Typography variant="h4">Create Your Account</Typography>
            </Grid>
            <Grid item xs={12} sx={{ flexDirection: 'column', rowGap: '10px', my: 2}}>
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
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Grid>
        </React.Fragment>
    );
};

export default connect(null, { setAlert })(AuthModal);
