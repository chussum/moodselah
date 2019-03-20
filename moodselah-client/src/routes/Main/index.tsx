import * as React from 'react';
import { Query } from 'react-apollo';
import autobind from 'autobind-decorator';
import { getPosts } from '~/types/api';
import { GET_POSTS } from './queries';
import Main from './Main';

export interface IProps {}

export interface IState {
  isInfiniteScroll: boolean;
  isFinishedLoadMore: boolean;
}

class GetPostsQuery extends Query<getPosts> {}

class MainContainer extends React.Component<IProps, IState> {
  $mounted: boolean = false;
  fetchMore: any;
  skip: number = 0;

  state: IState = {
    isInfiniteScroll: false,
    isFinishedLoadMore: false
  };

  componentDidMount() {
    this.$mounted = true;
  }

  componentWillUnmount() {
    this.$mounted = false;
  }

  setStateIfMounted(state, callback = undefined) {
    if (this.$mounted) {
      this.setState(state, callback);
    }
  }

  @autobind
  private onLoadMore() {
    if (!this.$mounted) return;
    if (!this.fetchMore) return;
    if (this.state.isFinishedLoadMore) return;

    this.fetchMore({
      variables: {
        skip: this.skip
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const prevPosts = prev.GetPosts.posts ? prev.GetPosts.posts : [];
        const nextPosts = fetchMoreResult.GetPosts.posts ? fetchMoreResult.GetPosts.posts : [];
        if (nextPosts.length < 20) {
          this.setStateIfMounted({ isFinishedLoadMore: true });
        }
        return {
          ...prev,
          GetPosts: {
            ...prev.GetPosts,
            posts: [...prevPosts, ...nextPosts]
          }
        };
      }
    });
  }

  @autobind
  private onClickLoadMore(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.setStateIfMounted({ isInfiniteScroll: true });
  }

  public render() {
    return (
      <GetPostsQuery query={GET_POSTS} variables={{ skip: 0 }}>
        {({ data, fetchMore, loading }) => {
          const { GetPosts: { posts = null } = {} } = (data as any) || {};
          this.fetchMore = fetchMore;
          this.skip = posts ? posts.length : 0;
          return (
            <Main
              {...this.state}
              {...this.props}
              onClickLoadMore={this.onClickLoadMore}
              onLoadMore={this.onLoadMore}
              loading={loading}
              data={data}
            />
          );
        }}
      </GetPostsQuery>
    );
  }
}

export default MainContainer;
