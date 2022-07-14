import { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import MainApp from "../components/Main/MainApp";
import { setFileName, setData } from "../actions";

const UserDoc = (props) => {
    const { setFileName, mdData, setData } = props
    const router = useRouter()

    useEffect(() => {
        let route = router.query.id
        
        if (!mdData) {
            let localData = localStorage.getItem('localData')
            localData = JSON.parse(localData)

            if (localData[`${route}`]) { 
                setFileName(`${route}.md`);
                setData(localData[`${route}`].data);
                return
            } else {
                router.push('/')
            }
        }
    }, [])

    return <MainApp />
}

export const getServerSideProps = async () => {
    return {
        props: {}
    }
}

const mapStateToProps = (state) => {
    return {
        mdData: state.mdData
    }
}

export default connect(mapStateToProps, { setFileName, setData })(UserDoc)