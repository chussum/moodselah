import React from 'react';
import { Query } from 'react-apollo';
import { getPost } from '~/types/api';
import { RouteComponentProps } from 'react-router-dom';
import PostView from './PostView';
import { GET_POST } from './queries';

interface IState {
  id: number;
}

interface IProps extends RouteComponentProps<any> {}

class PostViewQuery extends Query<getPost> {}

class PostViewContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    const {
      params: { id }
    } = props.match;
    this.state = {
      id: +id
    };
  }

  public render() {
    const { id } = this.state;
    return (
      <PostViewQuery query={GET_POST} variables={{ id }}>
        {({ data, loading }) => {
          return <PostView {...this.props} {...this.state} loading={loading} data={data} />;
        }}
      </PostViewQuery>
    );
  }
}

export default PostViewContainer;
