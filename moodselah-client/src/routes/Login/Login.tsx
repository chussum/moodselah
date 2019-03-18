import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import i18n from '~/helpers/i18n';
import s from './Login.module.scss';

interface IProps {
  t: (keyword: string) => string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const Login: React.SFC<IProps> = ({ t, loading, onInputChange, onSubmit }) => (
  <>
    <Helmet>
      <title>{t('login.title')} - Moodselah</title>
    </Helmet>
    <div className={s.container}>
      <form onSubmit={onSubmit}>
        <div className={s.form}>
          <div className={s.subtitle}>{t('login.title')}</div>
          <div className={s.row}>
            <TextField
              name="email"
              label={t('login.username')}
              className={s.textField}
              onChange={onInputChange}
              autoComplete="username"
            />
          </div>
          <div className={s.row}>
            <TextField
              name="password"
              type="password"
              label={t('login.password')}
              className={s.textField}
              onChange={onInputChange}
              autoComplete="current-password"
            />
          </div>
          <div className={classNames(s.row, s.btnContainer)}>
            <Button type="submit" variant="contained" color="primary" className={s.btnLogin} disabled={loading}>
              {t('login.submit')}
            </Button>
          </div>
          <div className={classNames(s.row, s.footer)}>
            <Link to="/register">{t('register.title')}</Link>
            {/* <Link to="/forgot">{t('forgot.title')}</Link> */}
          </div>
        </div>
      </form>
    </div>
  </>
);

export default i18n(Login);
