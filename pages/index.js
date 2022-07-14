import { useEffect } from "react";
import MainApp from "../components/Main/MainApp";
import { connect } from "react-redux";

import { setFileName, setData } from "../actions";

const Home = (props) => {
    const { setFileName, setData } = props

    useEffect(() => {
        setFileName('welcome.md')
        setData('')
    }, [])
    
    return (
        <MainApp />
    );
};


export default connect(null, { setFileName, setData })(Home)

