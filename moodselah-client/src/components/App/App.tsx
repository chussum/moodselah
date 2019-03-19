import * as React from 'react';
import { Router } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import routes, { RouteConfig } from '~/routes';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import { User } from '~/types/local';
import s from './App.module.scss';

const history = createBrowserHistory();

export interface AppProps {
  user?: User;
  isLoggedIn: boolean;
}

interface RouteProps {
  user?: User;
  isLoggedIn: boolean;
  route: RouteConfig;
}

interface SubRouteProps extends RouteConfig {
  user?: User;
  isLoggedIn: boolean;
}

const PrivateRoute = ({ user, isLoggedIn, route }: RouteProps) => {
  const render = (props: any) =>
    isLoggedIn ? (
      <route.component {...props} user={user} routes={route.routes} />
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    );
  return <Route path={route.path} render={render} />;
};

const PublicRoute = ({ user, isLoggedIn, route }: RouteProps) => {
  const render = (props: any) => {
    const { from } = props.location.state || { from: { pathname: '/' } };
    return !isLoggedIn ? <route.component {...props} user={user} routes={route.routes} /> : <Redirect to={from} />;
  };
  return <Route path={route.path} render={render} />;
};

const RouteWithSubRoutes = (route: SubRouteProps) => {
  const { user, isLoggedIn } = route;
  if (route.private === true) {
    return <PrivateRoute user={user} isLoggedIn={isLoggedIn} route={route} />;
  }
  if (route.public === true) {
    return <PublicRoute user={user} isLoggedIn={isLoggedIn} route={route} />;
  }
  const render = (props: any) => (
    <route.component {...props} user={user} isLoggedIn={isLoggedIn} routes={route.routes} />
  );
  return <Route path={route.path} render={render} />;
};

const App = (props: AppProps) => {
  const { isLoggedIn, user } = props;
  return (
    <Router history={history}>
      <div className={s.container}>
        <Header isLoggedIn={isLoggedIn} user={user} />
        <section className={s.content}>
          <main className={s.main} role="main">
            <Switch>
              {routes.map((route: RouteConfig) => (
                <RouteWithSubRoutes key={route.path} {...route} user={user} isLoggedIn={isLoggedIn} />
              ))}
              <Redirect from="*" to="/" />
            </Switch>
          </main>
        </section>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
