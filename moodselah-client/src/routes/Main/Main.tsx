import * as React from 'react';
import Helmet from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';
import Button from '@material-ui/core/Button';
import CardImage from '~/components/CardImage';
import LoadingIcon from '~/components/LoadingIcon';
import i18n from '~/helpers/i18n';
import s from './Main.module.scss';
import { getPosts_GetPosts } from '~/types/api';

interface IProps {
  t: (keyword: string) => string;
  loading: boolean;
  data: {
    GetPosts: getPosts_GetPosts;
  };
  onLoadMore: any;
  isInfiniteScroll: boolean;
  isFinishedLoadMore: boolean;
  onClickLoadMore: (e: React.MouseEvent<HTMLElement>) => void;
}

const Main: React.SFC<IProps> = React.memo(props => {
  if (props.loading) {
    return null;
  }
  const { GetPosts: { posts = null, hasNext = false } = {} } = props.data || {};
  if (!posts) {
    return null;
  }
  return (
    <>
      <Helmet>
        <title>Moodselah</title>
      </Helmet>
      <div className={s.container}>
        <div className={s.content}>
          <section>
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
                  <CardImage key={post.id} linkUrl={`/posts/${post.id}`} imageUrl={thumbUrl} nick={post.author.nick} />
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
    </>
  );
});

export default i18n(Main);
