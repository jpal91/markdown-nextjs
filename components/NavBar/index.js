import React from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ButtonBase from "@mui/material/ButtonBase";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import { toggleMenu, setLoading } from "../../actions/index.js";

import SubBar from "./SubBar/SubBar.js";
import SideNav from "./SideNav/SideNav.js";
import SaveDeleteContainer from "./SaveDeleteContainer";
import FileInfo from "./FileInfo.js";
import Alerts from "../Main/Alerts/Alerts";
import SubBarToggles from "./SubBar/SubBarToggles.js";

//Main component holding the top screen navigation
const NavBar = (props) => {
    const { isMenuOpen, toggleMenu, setLoading, loading } = props;
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <React.Fragment>
            <AppBar
                sx={{
                    width: isMenuOpen ? "calc(100% - 240px)" : "100%",
                    ml: isMenuOpen ? "240px" : 0,
                    contentVisibility: loading ? 'hidden' : 'visible'
                }}
            >
                <Grid
                    container
                    sx={{
                        width: "100%",
                        height: "100%",
                        flexWrap: "nowrap",
                        alignItems: "center",
                        ml: { xs: 0, lg: 0 },
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        lg={6}
                        sx={{ justifyContent: "flex-start", height: "100%" }}
                    >
                        <Toolbar sx={{ p: "0 !important" }}>
                            <IconButton
                                color="inherit"
                                edge={false}
                                onClick={() => toggleMenu(!isMenuOpen)}
                                sx={{
                                    mr: 5,
                                    backgroundColor: "background.icon",
                                    borderRadius: 0,
                                    height: "100%",
                                    width: "72px",
                                }}
                                aria-label={`${
                                    isMenuOpen ? "Close" : "Open"
                                } menu`}
                                title={`${isMenuOpen ? "Close" : "Open"} menu`}
                                id='toggle-menu'
                            >
                                {isMenuOpen ? (
                                    <CloseIcon sx={{ fontSize: "35px" }} />
                                ) : (
                                    <MenuIcon sx={{ fontSize: "35px" }} />
                                )}
                            </IconButton>
                        </Toolbar>
                        <Link href="/">
                            <ButtonBase
                                onClick={() => {
                                    toggleMenu(false);
                                    setLoading(true);
                                }}
                                aria-label="Home"
                                title="Home"
                                sx={{ display: { xs: isMenuOpen && 'none', sm: 'inline-flex' } }}
                            >
                                <a>
                                    <Typography variant="heading" sx={{ '&:hover': { opacity: 0.8 } }}>
                                        .MARK
                                        <KeyboardDoubleArrowDownIcon />
                                    </Typography>
                                </a>
                            </ButtonBase>
                        </Link>
                        <Box
                            sx={{
                                border: "1px solid",
                                borderColor: "background.icon",
                                ml: 5,
                                my: 1,
                                display: { xs: 'none', sm: 'initial' }
                            }}
                        />
                        <FileInfo />
                    </Grid>
                    <SaveDeleteContainer display={matches ? 'flex' : 'none'}/>
                    <SubBarToggles display={!matches ? 'flex' : 'none'}/>
                </Grid>
            </AppBar>
            <SubBar />
            <SideNav />
            <Alerts />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        isMenuOpen: state.isMenuOpen,
        loading: state.loading
    };
};

export default connect(mapStateToProps, { toggleMenu, setLoading })(NavBar);
