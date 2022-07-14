import { useEffect } from "react";
import { useRouter } from "next/router";
import MainApp from "../components/Main/MainApp";
import { connect } from "react-redux";

import { setFileName, setData } from "../actions";

const Home = (props) => {
    const { setFileName, setData } = props;
    const router = useRouter();

    useEffect(() => {
        if (router.pathname === "/") {
            setFileName("welcome.md");
            setData("");
        }
    }, [router]);

    return <MainApp />;
};

export default connect(null, { setFileName, setData })(Home);
