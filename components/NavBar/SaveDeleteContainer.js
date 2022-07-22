import React, { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import Grid from "@mui/material/Grid";

import Save from "./Save";
import Delete from "./Delete";
import { connect } from "react-redux";

const SaveDeleteContainer = (props) => {
    const { isExamplePage } = props
    const [visibility, setVisibility] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (isExamplePage) {
            setVisibility(false);
            return;
        }
        setVisibility(true);
    }, [isExamplePage]);

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

const mapStateToProps = (state) => {
    return {
        isExamplePage: state.isExamplePage
    }
}

export default connect(mapStateToProps)(SaveDeleteContainer)
