import React, { useEffect } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import MainApp from "../../components/Main/MainApp";
import {
    setFileName,
    setData,
    setButtonStatus,
    getDBData,
    setSaveState,
    setLoading,
} from "../../actions";

const LocalUserDoc = (props) => {
    const {
        setFileName,
        setData,
        setButtonStatus,
        pageId,
        localData,
        setSaveState,
        setLoading,
    } = props;
    const router = useRouter();

    useEffect(() => {
        setButtonStatus({
            save: "existing",
            fileName: "rename",
            delete: "existing",
        });

        setSaveState("local");
        setFileName(`${pageId}`);

        return () => {
            setLoading(false);
        };
    }, []);

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
            <Head>
                <title>.MD - Local Files</title>
            </Head>
            <MainApp />
        </React.Fragment>
    );
};

export const getServerSideProps = async (context) => {
    const { id } = context.params;

    return {
        props: {
            pageId: id,
        },
    };
};

const mapStateToProps = (state) => {
    return {
        localData: state.localData,
        authUser: state.authUser,
    };
};

export default connect(mapStateToProps, {
    setFileName,
    setData,
    setButtonStatus,
    getDBData,
    setSaveState,
    setLoading,
})(LocalUserDoc);
