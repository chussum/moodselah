import React from 'react';
import Avatar from './Avatar';

interface IState {}

interface IProps {
  containerClassName?: any;
  user: any;
  size?: 'xs' | 'sm' | 'm' | 'lg' | 'xl' | 'xxl';
}

class Container extends React.Component<IProps, IState> {
  public render() {
    return <Avatar {...this.props} {...this.state} />;
  }
}

export default Container;
