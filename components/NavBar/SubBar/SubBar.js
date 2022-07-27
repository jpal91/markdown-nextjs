import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import SubBarToggles from "./SubBarToggles";

//Component holding the thin bar between the main app and the top navbar
const SubBar = (props) => {
    const {
        isMenuOpen,
        isPreviewMode,
    } = props;
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Grid
            container
            className="subBar"
            sx={{
                width: { lg: isMenuOpen ? "calc(100% - 240px)" : "100%", xs: '100%'},
                backgroundColor: "background.subBar",
                height: "42px",
                ml: { lg: isMenuOpen ? "240px" : 0},
                position: "sticky",
            }}
        >
            <Grid
                item
                xs={isPreviewMode ? 0 : 12}
                sm={6}
                sx={{
                    borderRight: "1px solid",
                    borderColor: "background.borders",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    display: isPreviewMode ? "none" : "flex",
                    pl: 2,
                }}
            >
                <Typography variant="subBarText">MARKDOWN</Typography>
            </Grid>
            <Grid
                container
                item
                xs={isPreviewMode ? 12 : 0}
                sm={6}
                sx={{
                    borderLeft: isPreviewMode ? "0px" : "1px solid",
                    borderColor: "background.borders",
                    alignItems: "center",
                    justifyContent: { xs: 'flex-start' },
                    display: { xs: !isPreviewMode && 'none', sm: 'flex' }
                }}
            >
                <Grid item xs={6} sx={{ justifyContent: "flex-start", pl: 2 }}>
                    <Typography variant="subBarText">PREVIEW</Typography>
                </Grid>
                <SubBarToggles display={matches ? 'flex' : 'none'}/>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        isPreviewMode: state.isPreviewMode,
        isMenuOpen: state.isMenuOpen,
    };
};

export default connect(mapStateToProps)(
    SubBar
);
