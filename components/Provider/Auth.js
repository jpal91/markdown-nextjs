import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { connect } from "react-redux";

import { setAuthUser, getDBData } from "../../actions";

const Auth = (props) => {
  const { setAuthUser, authUser, getDBData } = props;
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user && !authUser) {
      setAuthUser(session.user.name);
      getDBData();
    }
  }, [session]);

  return <React.Fragment>{props.children}</React.Fragment>;
};

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser
  };
};

export default connect(mapStateToProps, { setAuthUser, getDBData })(Auth);
