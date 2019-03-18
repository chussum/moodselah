import * as React from 'react';
import { Link } from 'react-router-dom';
import s from './CardImage.module.scss';
import classNames from 'classnames';

interface IProps {
  nick: string;
  linkUrl: string;
  imageUrl: string;
}

const onImageLoad = (e: any) => {
  const img: any = e.target;
  const width = img.naturalWidth;
  const height = img.naturalHeight;
  img.parentNode.style.paddingBottom = `${(height / width) * 100}%`;
};

const CardImage = (props: IProps) => (
  <figure className={s.container}>
    <Link to={props.linkUrl}>
      <div className={s.relative}>
        <div className={classNames(s.relative, s.thumbWrapper)}>
          <img src={props.imageUrl} alt="" onLoad={onImageLoad} />
        </div>
      </div>
    </Link>
    <figcaption className={s.thumbCaption}>
      <h6 className={s.truncate}>
        <Link to={props.linkUrl}>
          <span className={s.iconBy}>by</span>
          {props.nick}
        </Link>
      </h6>
    </figcaption>
  </figure>
);

export default React.memo(CardImage);
