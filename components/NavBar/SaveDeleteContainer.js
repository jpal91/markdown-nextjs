import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import Save from "./Save";
import Delete from "./Delete";
import { connect } from "react-redux";

const SaveDeleteContainer = (props) => {
    const { isExamplePage, isMenuOpen } = props;
    const [visibility, setVisibility] = useState(true);

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
            xs={ isMenuOpen ? 0 : 4 }
            lg={6}
            sx={{
                justifyContent: "flex-end",
                alignItems: "center",
                pr: { lg: 5 },
                contentVisibility: visibility ? "visible" : "hidden",
                display: { xs: isMenuOpen ? 'none' : 'visible' }
            }}
        >
            <Delete />
            <Save />
        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        isExamplePage: state.isExamplePage,
        isMenuOpen: state.isMenuOpen
    };
};

export default connect(mapStateToProps)(SaveDeleteContainer);
