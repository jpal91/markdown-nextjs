import { useEffect } from "react";
import { useRouter } from "next/router";
import MainApp from "../components/Main/MainApp";

const Home = () => {
    const router = useRouter()

    useEffect(() => {
        console.log(router.pathname)
    }, [])
    
    return (
        <MainApp />
    );
};


export default Home

