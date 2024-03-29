import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { connect } from "react-redux";

import { setAuthUser, getDBData, userLogOut, setAlert } from "../../actions";

//Watches authorization session and updates state accordingly
const Auth = (props) => {
    const { setAuthUser, authUser, getDBData, userLogOut, setAlert } = props;
    const { data: session } = useSession();

    //If there is a user, it will set user name in state and get their data from db
    //If no user session, it will make sure the userLogOut function is called so user can't access
    //any of the restricted options (ie saving to database)
    useEffect(() => {
        if (session?.user && !authUser) {
            setAuthUser(session.user.name)
            setAlert({ open: true, message: 'Logged in!', severity: 'success' })
            getDBData();
        }

        if (!session && authUser) {
            userLogOut();
        }
    }, [session]);

    return <React.Fragment>{props.children}</React.Fragment>;
};

const mapStateToProps = (state) => {
    return {
        authUser: state.authUser,
    };
};

export default connect(mapStateToProps, { setAuthUser, getDBData, userLogOut, setAlert })(
    Auth
);
