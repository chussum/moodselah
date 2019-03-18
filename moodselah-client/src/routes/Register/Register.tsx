import React from 'react';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import i18n from '~/helpers/i18n';
import s from './Register.module.scss';

interface IProps {
  t: (keyword: string) => string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const Register: React.SFC<IProps> = ({ t, loading, onInputChange, onSubmit }) => (
  <>
    <Helmet>
      <title>{t('register.title')} - Moodselah</title>
    </Helmet>
    <div className={s.container}>
      <form onSubmit={onSubmit}>
        <div className={s.form}>
          <div className={s.subtitle}>{t('register.title')}</div>
          <div className={s.row}>
            <TextField
              name="email"
              label={t('register.username')}
              className={s.textField}
              onChange={onInputChange}
              autoComplete="username"
            />
          </div>
          <div className={s.row}>
            <TextField name="nick" label={t('register.nick')} className={s.textField} onChange={onInputChange} />
          </div>
          <div className={s.row}>
            <TextField
              name="password"
              type="password"
              label={t('register.password')}
              className={s.textField}
              onChange={onInputChange}
              autoComplete="new-password"
            />
          </div>
          <div className={s.row}>
            <TextField
              name="confirmPassword"
              type="password"
              label={t('register.confirmPassword')}
              className={s.textField}
              onChange={onInputChange}
              autoComplete="new-password"
            />
          </div>
          <div className={classNames(s.row, s.btnContainer)}>
            <Button type="submit" variant="contained" color="primary" className={s.btnLogin} disabled={loading}>
              {t('register.submit')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  </>
);

export default i18n(Register);
