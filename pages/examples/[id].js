import { useEffect } from "react";
import { useRouter } from "next/router";
import MainApp from "../../components/Main/MainApp";

const Example = () => {
    const router = useRouter()

    useEffect(() => {
        console.log(router.query)
    }, [])

    return (
        <MainApp />
    );
}

export default Example