import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import s from './Avatar.module.scss';

interface IProps {
  containerClassName?: any;
  user: any;
  size?: 'xs' | 'sm' | 'm' | 'lg' | 'xl' | 'xxl';
}

const defaultPhoto = '/img/icon/avatar-blank.png';

const Avatar: React.SFC<IProps> = ({ user, containerClassName, size }) => {
  const combineContainer = classNames(
    s.container,
    {
      [s.xs]: size === 'xs',
      [s.sm]: size === 'sm',
      [s.m]: size === 'm',
      [s.lg]: size === 'lg',
      [s.xl]: size === 'xl',
      [s.xxl]: size === 'xxl'
    },
    containerClassName
  );
  const combineAvatar = classNames(s.avatar, {
    [s.xs]: size === 'xs',
    [s.sm]: size === 'sm',
    [s.m]: size === 'm',
    [s.lg]: size === 'lg',
    [s.xl]: size === 'xl',
    [s.xxl]: size === 'xxl'
  });
  return (
    <div className={combineContainer}>
      <img className={combineAvatar} src={user.profilePhoto || defaultPhoto} alt={user.nick} />
    </div>
  );
};

export default Avatar;
