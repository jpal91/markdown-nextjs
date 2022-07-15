import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import MainApp from "../components/Main/MainApp";
import { setFileName, setData, setButtonStatus, getDBData } from "../actions";

const UserDoc = (props) => {
    const { setFileName, mdData, setData, dbData, setButtonStatus, getDBData } = props;
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let route = router.query.id;

        setLoading(true)

        setButtonStatus({
            save: "existing",
            fileName: "rename",
            delete: "disabled",
        });

        setFileName(`${route}`);

        return () => {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        let route = router.query.id;

        if (!dbData.user) {
            async () => await getDBData()
            return
        } else if (dbData.user && !dbData.docs[`${route}`]) {
            router.push("/");
        } else {
            setFileName(`${route}`);
            setData(dbData.docs[`${route}`].md || "")
            setLoading(false)
        }
    }, [dbData, router])

    return (
        <React.Fragment>
            <MainApp />
            <Backdrop open={loading}>
                <CircularProgress sx={{ color: 'primary.lOrange' }} />
            </Backdrop>
        </React.Fragment>
    )
};

export const getServerSideProps = async () => {    
    return {
        props: {
        },
    };
};

const mapStateToProps = (state) => {
    return {
        mdData: state.mdData,
        localData: state.localData,
        dbData: state.dbData,
    };
};

export default connect(mapStateToProps, {
    setFileName,
    setData,
    setButtonStatus,
    getDBData
})(UserDoc);
