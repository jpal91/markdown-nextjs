import { forwardRef, useState } from "react";
import { SnackbarContent } from "notistack";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ExpandMore from "@mui/icons-material/ExpandMore";

const AlertBuilder = forwardRef((props, ref) => {
    const { severity, message } = props;
    const [open, setOpen] = useState(false);
    const isExtraText = severity === "limit" || severity === "new";

    const colors = {
        error: "red",
        success: "green",
        limit: "red",
        new: "hsl(13, 75%, 58%)",
    };

    const icons = {
        error: <ErrorOutlineOutlinedIcon sx={{ color: "white" }} />,
        success: <DoneOutlineOutlinedIcon sx={{ color: "white" }} />,
        limit: <ErrorOutlineOutlinedIcon sx={{ color: "white" }} />,
        new: <SentimentSatisfiedAltIcon sx={{ color: "white" }} />,
    };

    const extraText = {
        limit: "You are allowed a maximum of 10 files saved on the database. Please delete another file or save locally.",
        new: (
            <>
                If you want to learn more about .MARKDOWN please visit the{" "}
                <span>
                    <Link href="/guides/Intro">
                        <a>Intro</a>
                    </Link>
                </span>{" "}
                or{" "}
                <span>
                    <Link href="/guides/How-To">
                        <a>How-To</a>
                    </Link>
                </span>{" "}
                pages in the Guides section of the menu
            </>
        ),
    };

    return (
        <SnackbarContent ref={ref}>
            <Card
                sx={{
                    minWidth: "200px",
                    minHeight: "50px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: colors[severity],
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
                            sx={{ color: colors[severity] }}
                            gutterBottom
                        >
                            {extraText?.[severity] || ""}
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
                    {icons[severity]}
                    <Typography
                        variant="sideNavHeading"
                        sx={{ color: "white" }}
                    >
                        {message}
                    </Typography>
                    <IconButton
                        sx={{
                            transform: open ? "rotate(180deg)" : null,
                            display: !isExtraText && "none",
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

AlertBuilder.displayName = "AlertBuilder";

export default AlertBuilder;
