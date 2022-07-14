import React from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ButtonBase from "@mui/material/ButtonBase";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import { toggleMenu } from "../../actions/index.js";

import SubBar from "./SubBar.js";
import SideNav from "./SideNav/SideNav.js";
import SaveDeleteContainer from "./SaveDeleteContainer";
import FileInfo from "./FileInfo.js";
import Alerts from "../Main/Alerts";

const NavBar = (props) => {
  const { isMenuOpen, toggleMenu } = props;

  return (
    <React.Fragment>
      <AppBar
        sx={{
          backgroundColor: "background.navLight",
          position: "sticky",
          maxWidth: "100%",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: isMenuOpen ? "calc(100% - 240px)" : "100%",
          ml: isMenuOpen ? "240px" : 0
        }}
      >
        <Grid
          container
          sx={{
            width: "100%",
            height: "100%",
            flexWrap: "nowrap",
            alignItems: "center",
            p: { xs: 1, lg: 0 },
            ml: { xs: 0, lg: 0 }
          }}
        >
          <Grid
            item
            xs={6}
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
                  width: "72px"
                }}
              >
                {isMenuOpen ? (
                  <CloseIcon sx={{ fontSize: "35px" }} />
                ) : (
                  <MenuIcon sx={{ fontSize: "35px" }} />
                )}
              </IconButton>
            </Toolbar>
            <Link href="/">
              <ButtonBase>
                <a>
                  <Typography variant="heading">
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
                my: 1
              }}
            />
            <FileInfo />
          </Grid>
          <SaveDeleteContainer />
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
    isMenuOpen: state.isMenuOpen
  };
};

export default connect(mapStateToProps, { toggleMenu })(NavBar);
