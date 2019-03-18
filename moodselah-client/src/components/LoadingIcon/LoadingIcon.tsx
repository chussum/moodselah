import * as React from 'react';
import s from './LoadingIcon.module.scss';

const LoadingIcon = () => (
  <div className={s.loader}>
    <img src="/img/loading.svg" />
  </div>
);

export default LoadingIcon;
