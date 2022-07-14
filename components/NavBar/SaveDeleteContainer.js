import React, { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";

import Save from "./Save";
import Delete from "./Delete";

const SaveDeleteContainer = () => {
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
            <Delete />
            <Save />
        </Grid>
    );
};

export default SaveDeleteContainer
