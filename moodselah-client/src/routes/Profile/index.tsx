import React from 'react';
import { Query } from 'react-apollo';
import autobind from 'autobind-decorator';
import { getUser } from '~/types/api';
import Profile from './Profile';
import { GET_USER } from './queries';

interface IProps {
  location: any;
  match: any;
}

interface IState {
  nick: string;
  isInfiniteScroll: boolean;
  isFinishedLoadMore: boolean;
}

class UserProfileQuery extends Query<getUser> {}

class ProfileContainer extends React.Component<IProps, IState> {
  fetchMore: any;
  skip: number = 0;

  constructor(props) {
    super(props);
    const {
      params: { nick }
    } = props.match;
    this.state = {
      nick,
      isInfiniteScroll: false,
      isFinishedLoadMore: false
    };
  }

  @autobind
  private onLoadMore() {
    if (!this.fetchMore) return;
    if (this.state.isFinishedLoadMore) return;

    const { nick } = this.state;
    const where = this.generateWhereString();
    this.fetchMore({
      variables: {
        nick,
        skip: this.skip,
        where
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const prevPosts = prev.GetPosts.posts ? prev.GetPosts.posts : [];
        const nextPosts = fetchMoreResult.GetPosts.posts ? fetchMoreResult.GetPosts.posts : [];
        if (nextPosts.length < 20) {
          this.setState({ isFinishedLoadMore: true });
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
    this.setState({ isInfiniteScroll: true });
  }

  @autobind
  private generateWhereString() {
    const { nick } = this.state;
    return JSON.stringify({
      'author.nick': nick
    });
  }

  public render() {
    const { nick } = this.state;
    const where = this.generateWhereString();
    return (
      <UserProfileQuery query={GET_USER} variables={{ nick, skip: 0, where }}>
        {({ data: userData, fetchMore, loading }) => {
          const { GetPosts: { posts = null } = {} } = (userData as any) || {};
          this.fetchMore = fetchMore;
          this.skip = posts ? posts.length : 0;
          return (
            <Profile
              {...this.props}
              {...this.state}
              onClickLoadMore={this.onClickLoadMore}
              onLoadMore={this.onLoadMore}
              loading={loading}
              userData={userData}
            />
          );
        }}
      </UserProfileQuery>
    );
  }
}

export default ProfileContainer;
