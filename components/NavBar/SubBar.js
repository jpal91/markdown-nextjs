import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { keyframes } from "@emotion/react";

import { togglePreview } from "../../actions";

const fade = keyframes`
  from {
    max-width: 50%;
  }

  to {
    max-width: 100%;
  }
`

const reverseFade = keyframes`
  from {
    max-width: 100%;
  }

  to {
    max-width: 50%;
  }
`

// const display = keyframes`
//   from {
//     flex: 0 0 100%;
//     width: 100%;
//     padding-left: 16px;
//     visibility: visible;
//   }

//   to {
//     flex: 0 0 0%;
//     width: 0%;
//     padding-left: 0px;
//     visibility: hidden;
//   }
// `

// const reverseDisplay = keyframes`
//   from {
//     flex: 0 0 0%;
//     width: 0%;
//     padding-left: 0px;
//     visibility: hidden;
//   }

//   to {
//     flex: 0 0 100%;
//     width: 100%;
//     padding-left: 16px;
//     visibility: visible;
//   }

// `

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
        position: "sticky",
        justifyContent: isPreviewMode ? 'flex-end' : 'center'
      }}
    >
      <Grid
        item
        xs={isPreviewMode ? 0 : 6}
        sx={{
          borderRight: isPreviewMode ? '0px' : "1px solid",
          borderColor: "primary.vlgray",
          justifyContent: "flex-start",
          alignItems: "center",
          display: isPreviewMode ? 'none' : 'inherit',
          // animation: isPreviewMode ? `${display} 0.5s linear 0s 1 normal both` : `${reverseDisplay} 0.5s linear 0s normal both`,
          pl: 2,
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
          alignItems: "center",
          animation: isPreviewMode ? `${fade} 0.5s linear 0s 1 normal forwards` : `${reverseFade} 0.5s linear 0s 1 normal forwards`,
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
