import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import ButtonBase from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";

import { setModal, masterUpdateHandler } from "../../actions";

//Sub-component of SaveDeleteContainer - holds save button and it's functionality
const Save = (props) => {
    const {
        fileName,
        mdData,
        buttonStatus,
        setModal,
        masterUpdateHandler,
        saveState,
        isMenuOpen,
    } = props;
    const router = useRouter();

    const handleSave = async () => {
        //In the event that the user is on the home screen, the Save button acts the
        //same as the New Document button in the side nav
        if (buttonStatus.save === "new") {
            setModal({ open: true, type: "save-new" });
            return;
        }

        const newPost = {
            fileName: fileName,
            md: mdData,
            date: new Date().toLocaleDateString(),
        };

        masterUpdateHandler(saveState, "save", newPost);

        router.push(`/${saveState}/${fileName}`, undefined, { shallow: true });
    };

    return (
        <React.Fragment>
            <ButtonBase
                onClick={handleSave}
                aria-label="Save changes"
                title="Save changes"
                id="save-btn"
                sx={{
                    display: {
                        xs: "none",
                        sm: isMenuOpen ? "none" : "inline-flex",
                        lg: "inline-flex",
                    },
                    '&:hover': { opacity: 0.9 }
                }}
                disabled={buttonStatus.save === "disabled" && true}
            >
                <Image src="/images/save-button.svg" width="150" height="70" />
            </ButtonBase>
            <IconButton
                onClick={handleSave}
                aria-label="Save changes"
                title="Save changes"
                id="save-btn-icon"
                sx={{ display: { sm: "none" } }}
                disabled={buttonStatus.save === "disabled" && true}
            >
                <SaveIcon
                    sx={{ color: "primary.vlgray", fontSize: { xs: "40px" } }}
                />
            </IconButton>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        fileName: state.fileName,
        mdData: state.mdData,
        localData: state.localData,
        buttonStatus: state.buttonStatus,
        saveState: state.saveState,
        isMenuOpen: state.isMenuOpen,
    };
};

export default connect(mapStateToProps, {
    setModal,
    masterUpdateHandler,
})(Save);
