import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '~/components/Avatar';
import i18n from '~/helpers/i18n';
import s from './LoggedRightMenu.module.scss';
import classNames from 'classnames';

interface IProps {
  t: (keyword: string) => string;
  containerClassName?: any;
  user: any;
  isShow: boolean;
  menuRef: any;
  onShowMenu: () => void;
  onClickLogout: () => void;
}

const LoggedRightMenu: React.SFC<IProps> = ({
  t,
  containerClassName,
  user,
  isShow,
  menuRef,
  onShowMenu,
  onClickLogout
}) => (
  <>
    <button className={classNames(s.btnAvatar, containerClassName)} type="button" onClick={onShowMenu}>
      <Avatar user={user} size="m" />
    </button>
    {isShow ? (
      <ul ref={menuRef} className={s.popupMenu}>
        <li className={s.menuItem}>
          <Link to={`/@${user.nick}`}>{t('header.menu.profile')}</Link>
        </li>
        <li className={s.line} />
        <li className={s.menuItem}>
          <button type="button" onClick={onClickLogout}>
            {t('header.menu.logout')}
          </button>
        </li>
      </ul>
    ) : null}
  </>
);

export default i18n(LoggedRightMenu);
