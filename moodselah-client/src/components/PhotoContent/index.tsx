import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Mutation, MutationFn } from 'react-apollo';
import { toast } from 'react-toastify';
import autobind from 'autobind-decorator';
import {
  getPosts_GetPosts_posts,
  getPost_GetPost_post,
  getPost_GetPost_post_place,
  deletePost,
  deletePostVariables
} from '~/types/api';
import { GET_POSTS } from '~/routes/Main/queries';
import { DELETE_POST } from './queries';
import PhotoContent from './PhotoContent';

interface GetPosts extends getPosts_GetPosts_posts {
  place?: getPost_GetPost_post_place;
}

export interface PhotoContentProps extends RouteComponentProps {
  data: GetPosts | getPost_GetPost_post;
  isOwner?: boolean;
}

export interface PhotoContentState {}

class DeletePostMutation extends Mutation<deletePost, deletePostVariables> {}

class PhotoContentContainer extends React.Component<PhotoContentProps, PhotoContentState> {
  public deletePostMutation?: MutationFn<deletePost, deletePostVariables>;

  constructor(props: PhotoContentProps) {
    super(props);
  }

  @autobind
  private onClickRemove(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const { isOwner, data } = this.props;
    if (!isOwner) {
      toast.error('잘못된 접근입니다.');
      return;
    }
    if (!confirm('정말로 삭제하시겠습니까?')) {
      return;
    }
    if (this.deletePostMutation) {
      this.deletePostMutation({ variables: { id: data.id } });
    }
  }

  @autobind
  private postDeletePostMutation(data) {
    const { history } = this.props;
    const { DeletePost } = data;
    if (DeletePost.success) {
      setTimeout(() => {
        history.push({
          pathname: '/'
        });
      });
    } else {
      toast.error(DeletePost.error);
    }
  }

  render() {
    return (
      <DeletePostMutation
        mutation={DELETE_POST}
        onCompleted={this.postDeletePostMutation}
        refetchQueries={[
          {
            query: GET_POSTS,
            variables: { skip: 0 }
          }
        ]}
      >
        {mutation => {
          this.deletePostMutation = mutation;
          return <PhotoContent {...this.state} {...this.props} onClickRemove={this.onClickRemove} />;
        }}
      </DeletePostMutation>
    );
  }
}

export default withRouter(PhotoContentContainer);
