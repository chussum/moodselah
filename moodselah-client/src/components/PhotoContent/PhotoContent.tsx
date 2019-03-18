import React from 'react';
import { Link } from 'react-router-dom';
import { getPosts_GetPosts_posts, getPost_GetPost_post, getPost_GetPost_post_place } from '~/types/api';
import Avatar from '../Avatar';
import PhotoSlider from '../PhotoSlider';
import Map from '~/components/Map';
import nl2br from '~/helpers/nl2br';
import s from './PhotoContent.module.scss';

interface GetPosts extends getPosts_GetPosts_posts {
  place?: getPost_GetPost_post_place;
}

interface IProps {
  data: GetPosts | getPost_GetPost_post;
  isOwner?: boolean;
  onClickRemove: (e: React.MouseEvent<HTMLElement>) => void;
}

const INFORMATION = {
  WIFI: {
    0: 'WiFi 확인 안해봤어요.',
    1: 'WiFi 있었어요.',
    2: 'WiFi는 없었어요.'
  },
  CHILD_CHAIR: {
    0: '아기의자가 있었나?',
    1: '아기의자가 있어요.',
    2: '아기의자가 없어요.'
  },
  STUDY: {
    0: '모름',
    1: '스터디하기에도 좋아요.',
    2: '스터디하기에는 별로예요.'
  }
};

const PhotoContent: React.SFC<IProps> = ({ data, isOwner, onClickRemove }) => (
  <div className={s.root}>
    <article className={s.container}>
      <header className={s.header}>
        <Link className={s.profileLink} to={`/@${data.author.nick}`}>
          <Avatar containerClassName={s.avatarContainer} user={data.author} />
          <div className={s.nick}>{data.author.nick}</div>
        </Link>
      </header>
      <div className={s.photoContainer}>
        <PhotoSlider photos={data.photos} />
      </div>
      <div className={s.contentContainer}>
        <div className={s.content}>
          <Link to={`/@${data.author.nick}`}>
            <strong>{data.author.nick}</strong>
          </Link>
          &nbsp;
          {nl2br(data.content)}
          <ul className={s.information}>
            <li>
              <img src={data.wifi === 1 ? '/img/icon/wifi-active.png' : '/img/icon/wifi.png'} alt="wifi" />
              {INFORMATION.WIFI[data.wifi]}
            </li>
            <li>
              <img
                src={data.childChair === 1 ? '/img/icon/chair-active.png' : '/img/icon/chair.png'}
                alt="child-chair"
              />
              {INFORMATION.CHILD_CHAIR[data.childChair]}
            </li>
            {data.study ? (
              <li>
                <img src={data.study === 1 ? '/img/icon/school-active.png' : '/img/icon/school.png'} alt="study" />
                {INFORMATION.STUDY[data.study]}
              </li>
            ) : null}
          </ul>
          {isOwner ? (
            <div className={s.management}>
              <Link to={`/posts/${data.id}/edit`}>수정</Link>
              <button type="button" onClick={onClickRemove}>
                삭제
              </button>
            </div>
          ) : null}
        </div>
        {/* <section className={s.comments}>
          <ul>
            <li>
              <div>nick</div>
              <div>content</div>
            </li>
          </ul>
        </section> */}
      </div>
    </article>
    {data.place ? (
      <>
        <h3 className={s.mapTitle}>LOCATION</h3>
        <p className={s.mapAddress}>{data.place.address}</p>
        <Map
          className={s.map}
          initialOption={{
            level: 4,
            center: data.place
          }}
          data={[data.place]}
          maxZoomLevel={2}
        />
      </>
    ) : null}
  </div>
);

export default PhotoContent;
