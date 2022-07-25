import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import ButtonBase from "@mui/material/Button";

import { setModal, masterUpdateHandler } from "../../actions";

const Save = (props) => {
    const {
        fileName,
        mdData,
        buttonStatus,
        setModal,
        masterUpdateHandler,
        saveState,
    } = props;
    const router = useRouter();

    const handleSave = async () => {
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
            >
                <Image src="/images/save-button.svg" width="150" height="70" />
            </ButtonBase>
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
    };
};

export default connect(mapStateToProps, {
    setModal,
    masterUpdateHandler,
})(Save);
