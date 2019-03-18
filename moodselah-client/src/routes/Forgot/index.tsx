import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Forgot from './Forgot';

interface IState {}

interface IProps extends RouteComponentProps<any> {}

class ForgotContainer extends React.Component<IProps, IState> {
  public render() {
    return <Forgot {...this.props} {...this.state} />;
  }
}

export default ForgotContainer;
