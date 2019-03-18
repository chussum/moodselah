import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Header from './Header';

interface IState {}

interface IProps extends RouteComponentProps<any> {
  user?: any;
  isLoggedIn: boolean;
}

class Container extends React.Component<IProps, IState> {
  public render() {
    return <Header {...this.props} {...this.state} />;
  }
}

export default withRouter(Container);
