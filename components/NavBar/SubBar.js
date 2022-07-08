import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { togglePreview } from "../../actions";

const SubBar = (props) => {
  const { isMenuOpen, isPreviewMode, togglePreview } = props;

  return (
    <Grid
      container
      sx={{
        width: isMenuOpen ? "calc(100% - 240px)" : "100%",
        backgroundColor: "background.vlgray",
        height: "42px",
        ml: isMenuOpen ? "240px" : 0,
        position: "sticky"
      }}
    >
      <Grid
        item
        xs={6}
        sx={{
          borderRight: "1px solid",
          borderColor: "primary.vlgray",
          justifyContent: "flex-start",
          alignItems: "center",
          display: isPreviewMode ? 'none' : 'inherit',
          pl: 2
        }}
      >
        <Typography variant="body1" sx={{ color: "primary.lgray" }}>
          MARKDOWN
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={isPreviewMode ? 12 : 6}
        sx={{
          borderLeft: isPreviewMode ? '0px' : "1px solid",
          borderColor: "primary.vlgray",
          alignItems: "center"
        }}
      >
        <Grid item xs={6} sx={{ justifyContent: "flex-start", pl: 2 }}>
          <Typography variant="body1" sx={{ color: "primary.lgray" }}>
            PREVIEW
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ justifyContent: "flex-end", pr: 2 }}>
          <IconButton onClick={() => togglePreview(!isPreviewMode)}>
            {isPreviewMode ? <VisibilityOffOutlinedIcon/> : <RemoveRedEyeOutlinedIcon />}
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    isPreviewMode: state.isPreviewMode,
    isMenuOpen: state.isMenuOpen
  }
}

export default connect(mapStateToProps, { togglePreview })(SubBar);
