import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

const FileInfo = () => {
    return (
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
    );
};

export default FileInfo;
