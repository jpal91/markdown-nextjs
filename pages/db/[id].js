import React, { useEffect, useState } from "react";
import Head from "next/head";
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
      delete: "existing"
    });

    setSaveState("db");
    setFileName(`${pageId}`);

    return () => {
      setLoading(false);
    };
  }, []);

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
    setFileName(`${pageId}`);
  }, [dbData, pageId]);

  return (
    <React.Fragment>
      <Head>
        <title>.MD - Database Files</title>
      </Head>
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
