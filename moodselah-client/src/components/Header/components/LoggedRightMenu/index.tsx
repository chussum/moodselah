import autobind from 'autobind-decorator';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import ReactDOM from 'react-dom';
import { LOG_USER_OUT } from '~/sharedQueries.local';
import LoggedRightMenu from './LoggedRightMenu';

interface IProps extends RouteComponentProps {
  containerClassName?: any;
  user: any;
  location: any;
}

interface IState {
  isShow: boolean;
}

class Container extends React.Component<IProps, IState> {
  public menuRef: any = React.createRef();
  public state = {
    isShow: false
  };

  public componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({ isShow: false }, () => document.removeEventListener('click', this.documentClickEvent));
    }
  }

  public componentWillUnmount() {
    document.removeEventListener('click', this.documentClickEvent);
  }

  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logout => {
          return (
            <LoggedRightMenu
              {...this.props}
              {...this.state}
              menuRef={this.menuRef}
              onShowMenu={this.onShowMenu}
              onClickLogout={logout}
            />
          );
        }}
      </Mutation>
    );
  }

  @autobind
  private documentClickEvent(e) {
    const menuNode = ReactDOM.findDOMNode(this.menuRef.current);
    if (menuNode && menuNode.contains(e.target) === false) {
      this.setState({ isShow: false }, () => document.removeEventListener('click', this.documentClickEvent));
    }
  }

  @autobind
  private onShowMenu(e) {
    e.preventDefault();
    this.setState({ isShow: true }, () => document.addEventListener('click', this.documentClickEvent));
  }
}

export default withRouter(Container);
