import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import IconButton from "@mui/material/IconButton";

import { togglePreview, toggleScrollSync } from "../../../actions";

//Sub-component of SubBar - holds the two toggle buttons for ScrollSync and Preview Mode
const SubBarToggles = (props) => {
    const {
        isPreviewMode,
        isScrollSync,
        togglePreview,
        toggleScrollSync,
        display,
        isMenuOpen,
    } = props;

    return (
        <Grid
            item
            xs={6}
            sx={{
                justifyContent: "flex-end",
                pr: 2,
                display: { xs: isMenuOpen ? "none" : display, sm: display },
            }}
        >
            <IconButton
                onClick={() => toggleScrollSync(!isScrollSync)}
                sx={{
                    contentVisibility: {
                        xs: 'hidden',
                        sm: isPreviewMode ? "hidden" : 'visible',
                    },
                }}
                aria-label={`Turn scroll sync ${isScrollSync ? "off" : "on"}`}
                title={`Turn scroll sync ${isScrollSync ? "off" : "on"}`}
                id={display === "none" ? null : "toggle-ss-btn"}
                disabled={display === "none" && true}
            >
                {isScrollSync ? (
                    <LinkIcon
                        sx={{ color: { xs: "white", sm: "primary.text" }, '&:hover': { color: 'primary.lOrange' } }}
                    />
                ) : (
                    <LinkOffIcon
                        sx={{ color: { xs: "white", sm: "primary.text" }, '&:hover': { color: 'primary.lOrange' } }}
                    />
                )}
            </IconButton>
            <IconButton
                onClick={() => togglePreview(!isPreviewMode)}
                aria-label={`Turn preview mode ${isPreviewMode ? "off" : "on"}`}
                title={`Turn preview mode ${isPreviewMode ? "off" : "on"}`}
                id={display === "none" ? null : "toggle-prev-btn"}
                disabled={display === "none" && true}
            >
                {isPreviewMode ? (
                    <VisibilityOffOutlinedIcon
                        sx={{ color: { xs: "white", sm: "primary.text" }, '&:hover': { color: 'primary.lOrange' } }}
                    />
                ) : (
                    <RemoveRedEyeOutlinedIcon
                        sx={{ color: { xs: "white", sm: "primary.text" }, '&:hover': { color: 'primary.lOrange' } }}
                    />
                )}
            </IconButton>
        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        isPreviewMode: state.isPreviewMode,
        isScrollSync: state.isScrollSync,
        isMenuOpen: state.isMenuOpen,
    };
};

export default connect(mapStateToProps, { togglePreview, toggleScrollSync })(
    SubBarToggles
);
