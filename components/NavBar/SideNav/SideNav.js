import axios from "axios";
import Image from "next/image";
import { connect } from "react-redux";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";

import FileList from "./FileList";
import SaveDeleteContainer from "../SaveDeleteContainer";
import {
    setModal,
    setLightMode,
    setAuthUser,
    logOut,
    setAlert,
} from "../../../actions";

//Sub-component of NavBar/index
//Main component holding the side pop up menu
const SideNav = (props) => {
    const {
        isMenuOpen,
        setModal,
        unsaved,
        setLightMode,
        isLightMode,
        authUser,
        logOut,
        fileName,
        mdData,
        setAlert,
        buttonStatus,
        isExamplePage,
    } = props;
    const router = useRouter();
    const handleSwitch = () => setLightMode(!isLightMode);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const handleLogout = async () => {
        await signOut({ redirect: false }).then(() => {
            logOut();
            router.push("/");
        });
    };

    const handleDownload = async () => {
        try {
            await axios.post("/api/write-file", {
                name: fileName,
                content: mdData,
            });

            const a = document.createElement("a");
            a.href = `/temp/${fileName}.md`;
            a.setAttribute("download", `${fileName}.md`);
            a.click();
            a.remove();

            await axios.post("/api/delete-temp", { fileName: fileName });
        } catch (error) {
            setAlert({
                open: true,
                message: "Download failed! Please try again",
                severity: "error",
            });
        }
    };

    return (
        <Drawer variant="persistent" anchor="left" open={isMenuOpen}>
            <ButtonBase
                onClick={() =>
                    setModal({
                        open: true,
                        type:
                            buttonStatus.fileName === "new" ? "new" : "rename",
                    })
                }
                disabled={matches || isExamplePage}
                sx={{ justifyContent: "flex-start", pb: 5 }}
                id="mobile-new-doc-btn"
            >
                <Typography variant="sideNavHeading">
                    {matches ? "MY DOCUMENTS" : `${fileName}.md`}
                </Typography>
            </ButtonBase>
            <ButtonBase
                onClick={() =>
                    setModal({
                        open: true,
                        type: unsaved ? "save-warn" : "new",
                        redirect: "new",
                    })
                }
                aria-label="Create new document"
                title="Create new document"
                id="new-doc-btn"
                sx={{ '&:hover': { opacity: 0.8 } }}
            >
                <Image src="/images/new-document.svg" width="200" height="50" />
            </ButtonBase>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginBlock: "10px 10px",
                    rowGap: "10px",
                }}
            >
                <FileList listName="My Files" />
                <FileList listName="Examples" />
                <FileList listName="Guides" />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    flexDirection: "column",
                    height: "100%",
                    rowGap: "20px",
                    mb: 2,
                }}
            >
                <SaveDeleteContainer display={matches ? "none" : "flex"} />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "10px",
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "primary.dOrange",
                            visibility:
                                router.pathname === "/" ? "hidden" : "visible",
                            '&:hover': { opacity: 0.8, backgroundColor: "primary.dOrange" }
                        }}
                        onClick={handleDownload}
                        aria-label="Download"
                        title="Download file"
                    >
                        Download
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "primary.dOrange",
                            display: authUser && "none",
                            '&:hover': { opacity: 0.8, backgroundColor: "primary.dOrange" }
                        }}
                        onClick={() =>
                            setModal({
                                open: true,
                                type: unsaved ? "save-warn" : "login",
                                redirect: "login",
                            })
                        }
                        aria-label="Login"
                        title="Login"
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "primary.dOrange",
                            display: !authUser && "none",
                            '&:hover': { opacity: 0.8, backgroundColor: "primary.dOrange" }
                        }}
                        onClick={handleLogout}
                        aria-label="Logout"
                        title="Logout"
                    >
                        Logout
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "10px",
                    }}
                >
                    <ModeNightOutlinedIcon sx={{ color: "primary.vlgray" }} />
                    <Switch
                        color="warning"
                        checked={isLightMode}
                        onChange={handleSwitch}
                        sx={{
                            "& .MuiSwitch-track": { backgroundColor: "white" },
                            '&:hover': { "& .MuiSwitch-track": {backgroundColor: "primary.lOrange"} }
                        }}
                        aria-label="Switch between light and dark mode"
                        title="Switch between light and dark mode"
                    />
                    <Brightness5OutlinedIcon
                        sx={{ color: "primary.dOrange" }}
                    />
                </Box>
            </Box>
        </Drawer>
    );
};

const mapStateToProps = (state) => {
    return {
        isMenuOpen: state.isMenuOpen,
        unsaved: state.unsaved,
        isLightMode: state.isLightMode,
        authUser: state.authUser,
        fileName: state.fileName,
        mdData: state.mdData,
        buttonStatus: state.buttonStatus,
        isExamplePage: state.isExamplePage,
    };
};

export default connect(mapStateToProps, {
    setModal,
    setLightMode,
    setAuthUser,
    logOut,
    setAlert,
})(SideNav);
