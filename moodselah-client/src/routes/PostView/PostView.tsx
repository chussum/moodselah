import React from 'react';
import Helmet from 'react-helmet';
import PhotoContent from '~/components/PhotoContent';
import i18n from '~/helpers/i18n';
import { getPost_GetPost } from '~/types/api';
import s from './PostView.module.scss';

interface IProps {
  t: (keyword: string) => string;
  user?: any;
  loading: boolean;
  data: {
    GetPost: getPost_GetPost;
  };
}

const PostView: React.SFC<IProps> = props => {
  if (props.loading) {
    return null;
  }
  const { GetPost: { post = null } = {} } = props.data || {};
  if (!post) {
    return null;
  }
  const loggedUserId = props.user && props.user.id;
  const postedUserId = (post.author && post.author.id) || 0;
  const isOwner = +loggedUserId === +postedUserId;
  let title = post.content;
  if (title.length > 10) {
    title = `${title.substring(0, 10)}...`;
  }
  return (
    <>
      <Helmet>
        <title>{title} - Moodselah</title>
      </Helmet>
      <div className={s.container}>
        <div className={s.content}>
          <PhotoContent data={post} isOwner={isOwner} />
        </div>
      </div>
    </>
  );
};

export default i18n(PostView);