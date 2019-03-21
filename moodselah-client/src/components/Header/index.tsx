import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import autobind from 'autobind-decorator';
import Header from './Header';

interface IState {
  isOpenDrawer: boolean;
}

interface IProps extends RouteComponentProps<any> {
  user?: any;
  isLoggedIn: boolean;
}

class Container extends React.Component<IProps, IState> {
  state: IState = {
    isOpenDrawer: false
  };

  @autobind
  private toggleDrawer(e) {
    e.preventDefault();
    this.setState(prevState => ({ isOpenDrawer: !prevState.isOpenDrawer }));
  }

  public render() {
    return <Header {...this.props} {...this.state} toggleDrawer={this.toggleDrawer} />;
  }
}

export default withRouter(Container);
