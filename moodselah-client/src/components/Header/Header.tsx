import * as React from 'react';
import { NavLink, Link, RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';
import i18n from '~/helpers/i18n';
import { User } from '~/types/local';
import LoggedRightMenu from './components/LoggedRightMenu';
import s from './Header.module.scss';

const PublicHeader = () => (
  <>
    <div className={s.leftContainer}>
      <h1>
        <Link to="/">Moodselah</Link>
      </h1>
    </div>
    <div className={s.rightContainer}>
      <nav>
        <NavLink to="/" exact={true} activeClassName={s.active}>
          Feed
        </NavLink>
        <NavLink to="/map" exact={true} activeClassName={s.active}>
          Map
        </NavLink>
      </nav>
      <div className={s.asideContainer}>
        <Link className={s.btn} to="/login">
          Sign in
        </Link>
        <Link className={classNames(s.btn, s.register)} to="/register">
          Sign up
        </Link>
      </div>
    </div>
  </>
);

interface PrivateProps extends RouteComponentProps {
  t: any;
  user?: User;
}

const PrivateHeader = ({ t, location, user }: PrivateProps) => (
  <>
    <div className={s.leftContainer}>
      <h1>
        <Link to="/">Moodselah</Link>
      </h1>
    </div>
    <div className={s.rightContainer}>
      <nav>
        <NavLink to="/" exact={true} activeClassName={s.active}>
          Feed
        </NavLink>
        <a href="/map" className={location.pathname === '/map' ? s.active : undefined}>
          Map
        </a>
      </nav>
      <div className={s.asideContainer}>
        <Link className={s.btn} to={`/posts/write`}>
          {t('header.menu.write.photo')}
        </Link>
        <div className={s.avatarContainer}>
          <LoggedRightMenu user={user} />
        </div>
      </div>
    </div>
  </>
);

interface Props extends RouteComponentProps {
  t: any;
  user?: User;
  isLoggedIn: boolean;
}

const Header = (props: Props) => {
  const { isLoggedIn } = props;
  return (
    <header className={s.header}>
      <div className={s.content}>{isLoggedIn ? <PrivateHeader {...props} /> : <PublicHeader />}</div>
    </header>
  );
};

export default i18n(Header);
