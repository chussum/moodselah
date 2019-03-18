import React from 'react';
import Slider from 'react-slick';
import { getPosts_GetPosts_posts_photos, getPost_GetPost_post_photos } from '~/types/api';
import s from './PhotoSlider.module.scss';

interface IProps {
  photos: (getPosts_GetPosts_posts_photos | getPost_GetPost_post_photos | null)[] | null;
}

interface IArrowProps {
  className?: any;
  style?: any;
  onClick?: any;
}

const SliderPrevArrow: React.SFC<IArrowProps> = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      left: '16px',
      zIndex: 10,
      display: className.indexOf('disable') !== -1 ? 'none' : 'block'
    }}
    onClick={onClick}
  />
);

const SliderNextArrow: React.SFC<IArrowProps> = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      right: '16px',
      zIndex: 10,
      display: className.indexOf('disable') !== -1 ? 'none' : 'block'
    }}
    onClick={onClick}
  />
);

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <SliderPrevArrow />,
  nextArrow: <SliderNextArrow />
};

const onImageLoad = e => {
  const img: any = e.target;
  const width = img.naturalWidth;
  const height = img.naturalHeight;
  img.parentNode.style.paddingBottom = `${(height / width) * 100}%`;
};

const PhotoSlider: React.SFC<IProps> = ({ photos }) => (
  <Slider className={s.slider} {...settings}>
    {photos &&
      photos.map(photo => {
        if (!photo) {
          return null;
        }
        return (
          <div key={photo.id} className={s.slideItem}>
            <div className={s.slideContent}>
              <img className={s.photo} src={photo.path} alt="사진" onLoad={onImageLoad} />
            </div>
          </div>
        );
      })}
  </Slider>
);

export default PhotoSlider;
