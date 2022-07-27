import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { connect } from "react-redux";
import { promises as fs } from "fs";
import path from "path";

import MainApp from "../../components/Main/MainApp";

import {
    setData,
    setFileName,
    setButtonStatus,
    examplePage,
    setLoading, unsavedChanges
} from "../../actions";

//Page for Guides
const Guides = (props) => {
    const router = useRouter()
    const { setData, post, setFileName, id, setButtonStatus, examplePage, setLoading, unsavedChanges } =
        props;

    useEffect(() => {
        setFileName(`${id}.md`);
        setData(post);
        setButtonStatus({
            save: "disabled",
            fileName: "disabled",
            delete: "disabled",
        });
        examplePage(true);
        setLoading(false)
        unsavedChanges(false)

        return () => {
            examplePage(false);
        };
    }, []);

    useEffect(() => {
        setLoading(false)
        setFileName(`${id}.md`);
        setData(post);
    }, [router, id])

    return (
        <React.Fragment>
            <Head>
                <title>.MD - Guides</title>
            </Head>
            <MainApp />
        </React.Fragment>
    );
};


export const getStaticProps = async (context) => {
    const { params } = context;
    const filePath = path.join(
        process.cwd(),
        "public",
        "guide-docs",
        `${params.id}.md`
    );

    const post = await fs.readFile(filePath, "utf8").then((res) => {
        return res.replace(/\r\n/g, "\n");
    });

    return {
        props: {
            post,
            id: params.id,
        },
    };
};

export const getStaticPaths = async () => {
    return {
        paths: [
            { params: { id: "Intro" } },
            { params: { id: "How-To" } },
        ],
        fallback: true,
    };
};

export default connect(null, {
    setData,
    setFileName,
    setButtonStatus,
    examplePage,
    setLoading, unsavedChanges
})(Guides);