import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import MainApp from "../components/Main/MainApp";
import { connect } from "react-redux";

import { setFileName, setData, setButtonStatus } from "../actions";

const Home = (props) => {
    const { setFileName, setData, setButtonStatus } = props;
    const router = useRouter();

    useEffect(() => {
        setButtonStatus({
            save: 'new',
            fileName: 'new',
            delete: 'new'
          })
      
    }, [])

    useEffect(() => {
        if (router.pathname === "/") {
            setFileName("welcome.md");
            setData("");
        }
    }, [router]);

    return (
        <React.Fragment>
            <Head>
                <title>.MARKDOWN</title>
            </Head>
            <MainApp />
        </React.Fragment>
    )
};

export default connect(null, { setFileName, setData, setButtonStatus })(Home);
