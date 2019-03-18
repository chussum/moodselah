import * as React from 'react';
import Loadable from 'react-loadable';

export interface RouteConfig {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
  routes?: RouteConfig[];
  public?: boolean;
  private?: boolean;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "index" */ './Main'),
      loading: () => null
    })
  },
  {
    path: '/login',
    exact: true,
    public: true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "login" */ './Login'),
      loading: () => null
    })
  },
  {
    path: '/register',
    exact: true,
    public: true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "register" */ './Register'),
      loading: () => null
    })
  },
  {
    path: '/forgot',
    exact: true,
    public: true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "forgot" */ './Forgot'),
      loading: () => null
    })
  },
  {
    path: '/@:nick',
    exact: true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "profile" */ './Profile'),
      loading: () => null
    })
  },
  {
    path: '/profile',
    exact: true,
    private: true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "profile-edit" */ './ProfileEdit'),
      loading: () => null
    })
  },
  {
    path: '/map',
    exact: true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "map" */ './Map'),
      loading: () => null
    })
  },
  {
    path: '/posts/write',
    exact: true,
    private: true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "posts-write" */ './PostWrite'),
      loading: () => null
    })
  },
  {
    path: '/posts/:id',
    exact: true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "posts-view" */ './PostView'),
      loading: () => null
    })
  },
  {
    path: '/posts/:id/edit',
    exact: true,
    private: true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "posts-edit" */ './PostEdit'),
      loading: () => null
    })
  }
];

export default routes;
