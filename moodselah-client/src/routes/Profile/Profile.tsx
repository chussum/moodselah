import * as React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Avatar from '~/components/Avatar';
import Button from '@material-ui/core/Button';
import CardImage from '~/components/CardImage';
import LoadingIcon from '~/components/LoadingIcon';
import i18n from '~/helpers/i18n';
import s from './Profile.module.scss';
import { getPosts_GetPosts } from '~/types/api';

interface IProps {
  t: (keyword: string) => string;
  nick: string;
  user?: any;
  userData: any;
  loading: boolean;
  data: {
    GetPosts: getPosts_GetPosts;
  };
  onLoadMore: any;
  isInfiniteScroll: boolean;
  isFinishedLoadMore: boolean;
  onClickLoadMore: (e: React.MouseEvent<HTMLElement>) => void;
}

const Profile: React.SFC<IProps> = props => {
  const { t, loading, nick, user: currentUser, userData: { GetUserByNick: { user = null } = {} } = {} } = props;
  if (loading) {
    return null;
  }
  if (!user) {
    return <div className={s.empty}>{t('profile.empty')}</div>;
  }
  const { userData: { GetPosts: { posts = null, hasNext = false } = {} } = {} } = props || {};
  if (!posts) {
    return null;
  }
  const currentUserId = currentUser && currentUser.id;
  const isMe = currentUserId === user.id;
  const profilePhotoPath = user.profilePhoto;
  return (
    <>
      <Helmet>
        <title>{nick} - Moodselah</title>
        <meta property="og:title" content={`${nick} - Moodselah`} />
        <meta property="og:description" content={`${nick}님의 프로필 페이지`} />
        {profilePhotoPath ? <meta property="og:image" content={profilePhotoPath} /> : null}
      </Helmet>
      <div className={s.container}>
        {loading ? null : (
          <div className={s.profile}>
            <header className={s.header}>
              <div className={s.avatarContainer}>
                <Avatar user={user} size="xxl" />
              </div>
              <section className={s.userContainer}>
                <div className={s.row}>
                  <h1 className={s.nick}>{user.nick}</h1>
                  {isMe ? (
                    <Link className={s.btnProfileEdit} to="/profile">
                      프로필 수정
                    </Link>
                  ) : null}
                </div>
                {/* <div className={s.row}>
                  <span className={s.link}>
                    {t('profile.follower')}
                    <strong className={s.count}>{user.followerCount}</strong>
                  </span>
                  <span className={s.link}>
                    {t('profile.follow')}
                    <strong className={s.count}>{user.followingCount}</strong>
                  </span>
                </div> */}
              </section>
            </header>
            {/* <div className={s.tabContainer}>
              <ul className={s.tabBar}>
                <li className={s.active}>{t('profile.posts')}</li>
                <li>찜</li>
              </ul>
            </div> */}
            <div className={s.contentContainer}>
              <section className={s.content}>
                <InfiniteScroll
                  className={s.grid}
                  loadMore={props.onLoadMore}
                  hasMore={!props.isFinishedLoadMore && props.isInfiniteScroll}
                  loader={
                    <div className={s.loader} key={0}>
                      <LoadingIcon />
                    </div>
                  }
                >
                  {posts.map(post => {
                    if (!post) return null;
                    const thumbImage = post.photos && post.photos.length && post.photos[0];
                    const thumbUrl = thumbImage ? thumbImage.path : '';
                    return (
                      <CardImage
                        key={post.id}
                        linkUrl={`/posts/${post.id}`}
                        imageUrl={thumbUrl}
                        nick={post.author.nick}
                      />
                    );
                  })}
                </InfiniteScroll>
              </section>
              {hasNext && !props.isFinishedLoadMore && !props.isInfiniteScroll ? (
                <div className={s.buttonContainer}>
                  <Button
                    className={s.loadMore}
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={props.onClickLoadMore}
                  >
                    Load more
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default i18n(Profile);
