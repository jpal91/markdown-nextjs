import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import ButtonBase from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { updateLocalData } from "../../actions";

const Save = (props) => {
  const { fileName, mdData, localData, updateLocalData } = props;
  const router = useRouter();
  const [openSave, setOpenSave] = useState(false);

  const handleSave = () => {
    let fileWOExt = fileName.slice(0, -3);

    let newDataState = { ...localData }
    newDataState.docs[`${fileWOExt}`] = mdData
    updateLocalData(newDataState)

    router.push(`/${fileWOExt}`, undefined, { shallow: true });
    setOpenSave(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSave(false);
  };

  return (
    <React.Fragment>
      <ButtonBase onClick={handleSave}>
        <Image src="/images/save-button.svg" width="150" height="70" />
      </ButtonBase>
      <Snackbar open={openSave} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity="success" sx={{ px: 5 }}>
          Document Saved!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    fileName: state.fileName,
    mdData: state.mdData,
    localData: state.localData
  };
};

export default connect(mapStateToProps, { updateLocalData })(Save);


    // if (!localData) {
    //   let obj = {
    //     [`${fileWOExt}`]: {
    //       dateCreated: new Date().toLocaleDateString(),
    //       data: mdData
    //     }
    //   };
    //   localStorage.setItem("localData", JSON.stringify(obj));
    // } else if (!localData[`${fileWOExt}`]) {
    //   localData = JSON.parse(localData);
    //   localData[`${fileWOExt}`] = {
    //     dateCreated: new Date().toLocaleDateString(),
    //     data: mdData
    //   };
    //   localStorage.setItem("localData", JSON.stringify(localData));
    // } else if (localData[`${fileWOExt}`]) {
    //   localData = JSON.parse(localData);
    //   localData[`${fileWOExt}`].data = mdData;
    //   localStorage.setItem("localData", JSON.stringify(localData));
    // }
    // let localData = localStorage.getItem("localData");