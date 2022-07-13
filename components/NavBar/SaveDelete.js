import React, { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ButtonBase from "@mui/material/ButtonBase";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const SaveDelete = () => {
    const [visibility, setVisibility] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (router.pathname.includes("example")) {
            setVisibility(false);
            return;
        }
        setVisibility(true);
    }, [router]);

    return (
        <Grid
            item
            xs={6}
            sx={{
                justifyContent: "flex-end",
                alignItems: "center",
                pr: { xs: 5 },
                contentVisibility: visibility ? "visible" : "hidden",
            }}
        >
            <IconButton>
                <DeleteOutlineOutlinedIcon
                    sx={{ color: "primary.vlgray", mr: 2 }}
                />
            </IconButton>
            <ButtonBase>
                <Image src="/images/save-button.svg" width="150" height="70" />
            </ButtonBase>
        </Grid>
    );
};

export default SaveDelete;
