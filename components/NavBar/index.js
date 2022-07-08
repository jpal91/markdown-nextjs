import React, { useState } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ButtonBase from "@mui/material/ButtonBase";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import { toggleMenu } from "../../actions/index.js";

import SubBar from "./SubBar.js";

const NavBar = (props) => {
  const { isMenuOpen, toggleMenu } = props
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(!open);

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
                    .MARK<KeyboardDoubleArrowDownIcon/>
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
            <Grid container sx={{ width: "200px", ml: 1 }}>
              <Grid item xs={3} sx={{ alignItems: "center" }}>
                <InsertDriveFileOutlinedIcon />
              </Grid>
              <Grid item xs={9} sx={{ flexDirection: "column" }}>
                <Typography
                  variant="headingText"
                  sx={{ color: "primary.vlgray" }}
                >
                  Document Name
                </Typography>
                <Typography variant="headingText">welcome.md</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              justifyContent: "flex-end",
              alignItems: "center",
              pr: { xs: 5 }
            }}
          >
            <IconButton>
              <DeleteOutlineOutlinedIcon
                sx={{ color: "primary.vlgray", mr: 2 }}
              />
            </IconButton>
            <ButtonBase>
              <Image src="/images/save-button.svg" width="150" height="70" />
            </ButtonBase>
          </Grid>
        </Grid>
      </AppBar>
      <SubBar />
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
            backgroundColor: "background.navLight"
          }
        }}
      >
        thing
      </Drawer>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isMenuOpen: state.isMenuOpen
  }
}

export default connect(mapStateToProps, { toggleMenu })(NavBar)
