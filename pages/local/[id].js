import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import MainApp from "../../components/Main/MainApp";
import {
  setFileName,
  setData,
  setButtonStatus,
  getDBData,
  setSaveState
} from "../../actions";

const LocalUserDoc = (props) => {
  const {
    setFileName,
    setData,
    setButtonStatus,
    pageId,
    localData,
    setSaveState
  } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setButtonStatus({
      save: "existing",
      fileName: "rename",
      delete: "disabled"
    });

    setSaveState("local");
    setFileName(`${pageId}`);

    return () => {
      setLoading(false);
    };
  }, []);

  // useEffect(() => {
  //     let route = router.query.id;

  //     // setLoading(true)

  //     if (!dbData.user) {
  //         async () => await getDBData()
  //         return
  //     } else if (dbData.user && !dbData.docs[`${route}`]) {
  //         router.push("/");
  //     } else {
  //         setFileName(`${route}`);
  //         setData(dbData.docs[`${route}`].md || "")
  //         setLoading(false)
  //     }
  // }, [dbData, router])

  useEffect(() => {
    if (Object.keys(localData.docs).length === 0) {
      return;
    }

    if (!localData.docs[`${pageId}`]) {
      router.push("/");
      return;
    }

    setData(localData.docs[`${pageId}`].md || "");
    setLoading(false);
    setFileName(`${pageId}`);
  }, [localData, pageId]);

  return (
    <React.Fragment>
      <MainApp />
      <Backdrop open={loading}>
        <CircularProgress sx={{ color: "primary.lOrange" }} />
      </Backdrop>
    </React.Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  return {
    props: {
      pageId: id
    }
  };
};

const mapStateToProps = (state) => {
  return {
    localData: state.localData,
    authUser: state.authUser
  };
};

export default connect(mapStateToProps, {
  setFileName,
  setData,
  setButtonStatus,
  getDBData,
  setSaveState
})(LocalUserDoc);
