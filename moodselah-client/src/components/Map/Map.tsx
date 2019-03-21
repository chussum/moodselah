import * as React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import classNames from 'classnames';
import MapPlaceModal from '../MapPlaceModal';
import s from './Map.module.scss';

interface IProps {
  mapRef: React.RefObject<HTMLDivElement>;
  className?: any;
  onCloseMapPlaceModal: any;
  place: any;
  isVisiblePlaceInfo: boolean;
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
  slidesToShow: 4,
  slidesToScroll: 4,
  prevArrow: <SliderPrevArrow />,
  nextArrow: <SliderNextArrow />,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const Map: React.SFC<IProps> = React.memo(props => (
  <>
    <div ref={props.mapRef} className={classNames(props.className)} />
    <MapPlaceModal onClose={props.onCloseMapPlaceModal} isVisible={props.isVisiblePlaceInfo}>
      {props.place ? (
        <div className={s.info}>
          <h2 className={s.title}>{props.place.address}</h2>
          <div className={s.btnContainer}>
            <a
              className={s.btnLink}
              href={`http://map.daum.net/link/map/${props.place.address},${props.place.lat},${props.place.lng}`}
              target="_blank"
            >
              큰지도보기
            </a>
            <a
              className={s.btnLink}
              href={`http://map.daum.net/link/to/${props.place.address},${props.place.lat},${props.place.lng}`}
              target="_blank"
            >
              길찾기
            </a>
          </div>
          <div className={s.photos}>
            <Slider {...settings}>
              {props.place.photos.map(photo => (
                <a key={photo.path} href={`/posts/${photo.postId}`}>
                  <img src={photo.path} />
                </a>
              ))}
            </Slider>
          </div>
        </div>
      ) : null}
    </MapPlaceModal>
  </>
));

export default Map;
