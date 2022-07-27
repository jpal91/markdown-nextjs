import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import Save from "./Save";
import Delete from "./Delete";
import { connect } from "react-redux";

//Sub component of NavBar/index - holds both the Save and Delete components
const SaveDeleteContainer = (props) => {
    const { isExamplePage, isMenuOpen, display } = props;
    const [visibility, setVisibility] = useState(true);

    //To prevent saving/deleting of non-user owned docs, this section is hidden
    //when visiting one of these pages
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
            xs={12}
            sm={6}
            sx={{
                justifyContent: "flex-end",
                alignItems: "center",
                pr: { lg: 5 },
                contentVisibility: visibility ? "visible" : "hidden",
                display: { xs: display, sm: isMenuOpen ? 'none' : display, lg: display },
                columnGap: { xs: '40px', sm: 0 }
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
