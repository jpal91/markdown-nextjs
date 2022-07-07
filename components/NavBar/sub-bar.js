import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

const SubBar = () => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        backgroundColor: "background.vlgray",
        height: "42px"
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
        xs={6}
        sx={{
          borderLeft: "1px solid",
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
          <IconButton>
            <RemoveRedEyeOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SubBar;
