import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { connect } from "react-redux";

import { setAuthUser, getDBData, logOut } from "../../actions";

const Auth = (props) => {
  const { setAuthUser, authUser, getDBData, logOut } = props;
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session)
    if (session?.user && !authUser) {
      setAuthUser(session.user.name);
      getDBData();
    }

    if (!session && authUser) {
      logOut()
    }
  }, [session]);

  return <React.Fragment>{props.children}</React.Fragment>;
};

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser
  };
};

export default connect(mapStateToProps, { setAuthUser, getDBData, logOut })(Auth);
