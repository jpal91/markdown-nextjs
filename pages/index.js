import { useEffect } from "react";
import MainApp from "../components/Main/MainApp";
import { connect } from "react-redux";

import { setFileName } from "../actions";

const Home = (props) => {
    const { setFileName } = props

    useEffect(() => {
        setFileName('welcome.md')
    }, [])
    
    return (
        <MainApp />
    );
};


export default connect(null, { setFileName })(Home)

