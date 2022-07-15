import { useState } from 'react'
import Image from "next/image";
import { connect } from "react-redux";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";

import FileList from "./FileList";
import { setModal, setLightMode } from "../../../actions";

const SideNav = (props) => {
  const { isMenuOpen, setModal, unsaved, setLightMode, isLightMode } = props;
  const handleSwitch = () => setLightMode(!isLightMode)
  
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
      <ButtonBase onClick={() => setModal({ open: true, type: unsaved ? 'save-warn' : 'new' })}>
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
          alignItems: "flex-end",
          justifyContent: "center",
          height: "100%",
          mb: 2
        }}
      >
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
    isLightMode: state.isLightMode
  };
};

export default connect(mapStateToProps, { setModal, setLightMode })(SideNav);
