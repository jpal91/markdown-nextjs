import { useEffect } from "react";
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
            delete: 'disabled'
          })
      
    }, [])

    useEffect(() => {
        if (router.pathname === "/") {
            setFileName("welcome.md");
            setData("");
        }
    }, [router]);

    return <MainApp />;
};

export default connect(null, { setFileName, setData, setButtonStatus })(Home);
