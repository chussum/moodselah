import React from 'react';
import { graphql, Query } from 'react-apollo';
import { toast, ToastContainer } from 'react-toastify';
import App from './App';
import { IS_LOGGED_IN } from './queries.local';

const Container = (props: any) => {
  const {
    data: { auth = {} }
  } = props;
  return (
    <React.Fragment>
      <App user={auth.user} isLoggedIn={auth.isLoggedIn} />
      <ToastContainer draggable={true} position={toast.POSITION.BOTTOM_CENTER} />
    </React.Fragment>
  );
};

export default graphql(IS_LOGGED_IN)(Container);
