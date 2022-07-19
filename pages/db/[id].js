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
    dbData,
    setSaveState,
    authUser
  } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser) {
      router.push("/");
    }

    setButtonStatus({
      save: "existing",
      fileName: "rename",
      delete: "disabled"
    });

    setSaveState("db");
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
    if (Object.keys(dbData.docs).length === 0) {
      return;
    }

    if (!dbData.docs[`${pageId}`]) {
      router.push("/");
      return;
    }

    setData(dbData.docs[`${pageId}`].md || "");
    setLoading(false);
  }, [dbData]);

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
    dbData: state.dbData,
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
