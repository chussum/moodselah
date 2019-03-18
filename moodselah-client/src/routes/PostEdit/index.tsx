import React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import PostEdit from './PostEdit';
import { GET_POST } from '../PostView/queries';
import { getPost } from '~/types/api';

interface IState {
  id: number;
}

interface IProps extends RouteComponentProps<any> {}

class PostViewQuery extends Query<getPost> {}

class PostEditContainer extends React.Component<IProps, IState> {
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
          const { GetPost: { post = null } = {} } = (data as getPost) || {};
          if (!post) {
            return null;
          }
          return <PostEdit {...this.props} {...this.state} loading={loading} data={data} />;
        }}
      </PostViewQuery>
    );
  }
}

export default PostEditContainer;
