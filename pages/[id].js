import { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import MainApp from "../components/Main/MainApp";
import { setFileName, setData, setButtonStatus } from "../actions";

const UserDoc = (props) => {
    const { setFileName, mdData, setData, dbData, setButtonStatus } = props;
    const router = useRouter();

	useEffect(() => {
		setButtonStatus({
            save: 'existing',
            fileName: 'rename',
            delete: 'disabled'
          })
	}, [])

    useEffect(() => {
        let route = router.query.id;
        if (!dbData.user) {
            return;
        }

        if (!dbData.docs[`${route}`]) {
            router.push("/");
        }

                        setFileName(`${route}`);
                setData(dbData.docs[`${route}`].md || "");

        // if (!mdData) {
        //     if (dbData.docs[`${route}`]) {
        //         setFileName(`${route}`);
        //         setData(dbData.docs[`${route}`].md || "");
        //         return;
        //     } else {
                
        //         router.push("/");
        //     }
        // }
        // setFileName(`${route}`);
    }, [router]);

    return <MainApp />;
};

export const getServerSideProps = async () => {
    return {
        props: {},
    };
};

const mapStateToProps = (state) => {
    return {
        mdData: state.mdData,
        localData: state.localData,
        dbData: state.dbData,
    };
};

export default connect(mapStateToProps, { setFileName, setData, setButtonStatus })(UserDoc);
