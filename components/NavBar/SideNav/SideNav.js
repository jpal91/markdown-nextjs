import { useState } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";

import FileList from "./FileList";
import { setModal, setLightMode, setAuthUser, logOut } from "../../../actions";

const SideNav = (props) => {
  const {
    isMenuOpen,
    setModal,
    unsaved,
    setLightMode,
    isLightMode,
    authUser,
    logOut
  } = props;
  const router = useRouter();
  const handleSwitch = () => setLightMode(!isLightMode);

  const handleLogout = () => {
    logOut().then(() => {
      signOut({ redirect: false });
      router.push("/");
    });
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isMenuOpen}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "background.navLight",
          p: 2
        }
      }}
    >
      <Typography variant="sideNavHeading">MY DOCUMENTS</Typography>
      <ButtonBase
        onClick={() =>
          setModal({ open: true, type: unsaved ? "save-warn" : "new" })
        }
      >
        <Image src="/images/new-document.svg" width="200" height="100" />
      </ButtonBase>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBlock: "10px 10px",
          rowGap: "10px"
        }}
      >
        <FileList listName="My Files" />
        <FileList listName="Examples" />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "column",
          height: "100%",
          rowGap: "20px",
          mb: 2
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            contentVisibility: authUser && "hidden"
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "primary.dOrange" }}
            onClick={() => setModal({ open: true, type: "sign-up" })}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "primary.dOrange" }}
            onClick={() => setModal({ open: true, type: "login" })}
          >
            Login
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            contentVisibility: !authUser && "hidden"
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "primary.dOrange" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
          <ModeNightOutlinedIcon sx={{ color: "primary.vlgray" }} />
          <Switch
            color="warning"
            checked={isLightMode}
            onChange={handleSwitch}
            sx={{ "& .MuiSwitch-track": { backgroundColor: "white" } }}
          />
          <Brightness5OutlinedIcon sx={{ color: "primary.dOrange" }} />
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
    authUser: state.authUser
  };
};

export default connect(mapStateToProps, {
  setModal,
  setLightMode,
  setAuthUser,
  logOut
})(SideNav);
