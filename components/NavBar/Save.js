import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import ButtonBase from "@mui/material/Button";

import { updateLocalData, setAlert } from "../../actions";

const Save = (props) => {
  const { fileName, mdData, localData, updateLocalData, setAlert } = props;
  const router = useRouter();

  const handleSave = () => {
    let fileWOExt = fileName.slice(0, -3);

    let newDataState = { ...localData };
    newDataState.user = "localUser";
    newDataState.docs[`${fileWOExt}`] = {
      md: mdData,
      date: new Date().toLocaleDateString()
    };
    updateLocalData(newDataState);

    router.push(`/${fileWOExt}`, undefined, { shallow: true });

    setAlert({
      open: true,
      message: "Document Saved!",
      severity: "success"
    });
  };

  return (
    <React.Fragment>
      <ButtonBase onClick={handleSave}>
        <Image src="/images/save-button.svg" width="150" height="70" />
      </ButtonBase>
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

export default connect(mapStateToProps, { updateLocalData, setAlert })(Save);

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
