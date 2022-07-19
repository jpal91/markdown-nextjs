import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'

const Auth = (props) => {
    const { data: session, status } = useSession()

    useEffect(() => {
        console.log(session, status)
    }, [session])

    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export default Auth