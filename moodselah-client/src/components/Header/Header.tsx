import * as React from 'react';
import { NavLink, Link, RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import i18n from '~/helpers/i18n';
import { User } from '~/types/local';
import LoggedRightMenu from './components/LoggedRightMenu';
import s from './Header.module.scss';

interface DrawerIconProps {
  isOpen: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface DrawerMenuProps {
  isOpen: boolean;
  onToggle: (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => void;
}

const DrawerIcon = (props: DrawerIconProps) => (
  <button
    type="button"
    className={classNames(s.drawerIconContainer, props.isOpen ? s.activeDrawerIcon : null)}
    onClick={props.onClick}
  >
    <div className={s.drawerBar1} />
    <div className={s.drawerBar2} />
    <div className={s.drawerBar3} />
  </button>
);

const DrawerMenu = (props: DrawerMenuProps) => (
  <Drawer open={props.isOpen} onClose={props.onToggle}>
    <div className={s.drawerContainer}>
      <div className={s.drawerHeader}>
        <span>Moodselah</span>
        <button className={s.drawerClose} type="button" onClick={props.onToggle}>
          X
        </button>
      </div>
      <ul className={s.drawerMenu}>
        <li>
          <a href="/">Feed</a>
        </li>
        <li>
          <a href="/map">Map</a>
        </li>
      </ul>
    </div>
  </Drawer>
);

interface PublicProps {
  isOpenDrawer: boolean;
  toggleDrawer: () => void;
}

const PublicHeader = (props: PublicProps) => (
  <>
    <div className={s.leftContainer}>
      <DrawerIcon onClick={props.toggleDrawer} isOpen={props.isOpenDrawer} />
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
    <DrawerMenu isOpen={props.isOpenDrawer} onToggle={props.toggleDrawer} />
  </>
);

interface PrivateProps extends RouteComponentProps {
  t: any;
  user?: User;
  isOpenDrawer: boolean;
  toggleDrawer: () => void;
}

const PrivateHeader = ({ t, location, user, isOpenDrawer, toggleDrawer }: PrivateProps) => (
  <>
    <div className={s.leftContainer}>
      <DrawerIcon onClick={toggleDrawer} isOpen={isOpenDrawer} />
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
    <DrawerMenu isOpen={isOpenDrawer} onToggle={toggleDrawer} />
  </>
);

interface Props extends RouteComponentProps {
  t: any;
  user?: User;
  isLoggedIn: boolean;
  isOpenDrawer: boolean;
  toggleDrawer: () => void;
}

const Header = (props: Props) => {
  const { isLoggedIn } = props;
  return (
    <header className={s.header}>
      <div className={s.content}>{isLoggedIn ? <PrivateHeader {...props} /> : <PublicHeader {...props} />}</div>
    </header>
  );
};

export default i18n(Header);
