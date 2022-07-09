import Image from "next/image";
import { connect } from "react-redux";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import Switch from '@mui/material/Switch'
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';


const SideNav = (props) => {
    const { isMenuOpen } = props;

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
                    p: 2,
                },
            }}
        >
            <Typography variant="sideNavHeading">MY DOCUMENTS</Typography>
            <ButtonBase>
                <Image
                    src="/images/new-document.svg"
                    width="200"
                    height="100"
                />
            </ButtonBase>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginBlock: "10px 10px",
                    rowGap: "10px",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                        variant="headingText"
                        sx={{ color: "primary.vlgray" }}
                    >
                        01 April 2022
                    </Typography>
                    <Typography variant="headingText">welcome.md</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                        variant="headingText"
                        sx={{ color: "primary.vlgray" }}
                    >
                        01 April 2022
                    </Typography>
                    <Typography variant="headingText">welcome.md</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '100%', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                <ModeNightOutlinedIcon sx={{ color: 'primary.vlgray' }}/>
                <Switch color='warning' sx={{ '& .MuiSwitch-track': { backgroundColor: 'white' } }}/>
                <Brightness5OutlinedIcon sx={{ color: 'primary.dOrange' }}/>
                </Box>
            </Box>
        </Drawer>
    );
};

const mapStateToProps = (state) => {
    return {
        isMenuOpen: state.isMenuOpen,
    };
};

export default connect(mapStateToProps)(SideNav);
