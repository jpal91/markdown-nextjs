import React, { useState } from 'react'
import Link from 'next/link'
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ModeNightIcon from '@mui/icons-material/ModeNight';
import ButtonBase from '@mui/material/ButtonBase'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import CloseIcon from '@mui/icons-material/Close';

const NavBar = () => {
    // const themeCtx = useContext(ThemeContext);
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open)

    return (
        <React.Fragment>
        <AppBar sx={{ backgroundColor: "background.navLight", position: 'sticky', maxWidth: '100%', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: open ? 'calc(100% - 240px)' : '100%', ml: open ? '240px' : 0 }}>
            <Grid
                container
                sx={{
                    width: "100%",
                    height: '100%',
                    flexWrap: "nowrap",
                    alignItems: "center",
                    p: { xs: 1, lg: 0},
                    ml: { xs: 0, lg: 0 },
					
                }}
            >
                <Grid
                    item
                    xs={6}
                    sx={{ justifyContent: "flex-start", height: '100%' }}
                >
                    <Toolbar sx={{ p: 0 }}>
                        <IconButton
                            color='inherit'
                            edge='false'
                            onClick={handleOpen}
                            sx={{ mr: 2, backgroundColor: 'background.icon', borderRadius: 0, height: '100%', width: '72px' }}
                        >
                            {open ? <CloseIcon sx={{ fontSize: '35px' }} /> : <MenuIcon sx={{ fontSize: '35px' }} />}
                        </IconButton>
                    </Toolbar>
                    <Link href='/'>
                    <ButtonBase>
                    <a><Typography
                        sx={{ color: 'white' }}
                        variant='heading'
                    >
                        MARKDOWN
                    </Typography></a>
                    </ButtonBase>
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={6}

                    sx={{ justifyContent: "flex-end", mr: { xs: 5 }}}
                >
					{/* <IconButton onClick={() => themeCtx.changeTheme()}> */}
                    <ModeNightIcon sx={{ fontSize: 16, mr: 0.5, color: 'primary.text' }}/>
					<Typography
                        variant="h6"

                    >
                        Dark Mode
                    </Typography>
					{/* </IconButton> */}
                </Grid>
            </Grid>
        </AppBar>
        <Drawer
            variant='persistent'
            anchor='left'
            open={open}
            sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', backgroundColor: 'background.navLight' } }}
        >
            thing
        </Drawer>
        </React.Fragment>
    );
};

export default NavBar;