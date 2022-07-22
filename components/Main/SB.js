import { forwardRef, useState } from "react";
import { SnackbarContent } from "notistack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import ExpandMore from "@mui/icons-material/ExpandMore";

const SB = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const isLimit = props.severity === 'limit'

    const colors = {
        error: "red",
        success: "green",
        limit: "red",
    };

    const icons = {
        error: <ErrorOutlineOutlinedIcon sx={{ color: "white" }} />,
        success: <DoneOutlineOutlinedIcon sx={{ color: "white" }} />,
        limit: <ErrorOutlineOutlinedIcon sx={{ color: "white" }} />,
    };

    return (
        <SnackbarContent ref={ref}>
            <Card
                sx={{
                    minWidth: "200px",
                    minHeight: "50px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: colors[props.severity],
                    justifyContent: "center",
                    maxWidth: "350px",
                    gap: "10px",
                    flexDirection: "column",
                }}
            >
                <Collapse in={open} unmountOnExit>
                    <Paper sx={{ p: 4, width: "100%" }}>
                        <Typography
                            variant="h6"
                            sx={{ color: "red" }}
                            gutterBottom
                        >
                            You are allowed a maximum of 10 files saved on the
                            database. Please delete another file or save
                            locally.
                        </Typography>
                    </Paper>
                </Collapse>
                <CardActions
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "10px",
                        p: 2,
                    }}
                >
                    {icons[props.severity]}
                    <Typography
                        variant="sideNavHeading"
                        sx={{ color: "white" }}
                    >
                        {props.message}
                    </Typography>
                    <IconButton
                        sx={{
                            transform: open ? "rotate(180deg)" : null,
                            display: !isLimit && 'none'
                        }}
                        onClick={() => setOpen(!open)}
                    >
                        <ExpandMore sx={{ color: "white" }} />
                    </IconButton>
                </CardActions>
            </Card>
        </SnackbarContent>
    );
});

SB.displayName = 'SB'

export default SB;
