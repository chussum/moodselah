import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import React from 'react';
import Helmet from 'react-helmet';
import i18n from '~/helpers/i18n';
import s from './Forgot.module.scss';

interface IProps {
  t: (keyword: string) => string;
}

const Forgot: React.SFC<IProps> = ({ t }) => (
  <>
    <Helmet>
      <title>{t('forgot.title')} - Moodselah</title>
    </Helmet>
    <div className={s.container}>
      <div className={s.form}>
        <div className={s.subtitle}>{t('forgot.title')}</div>
        <div className={s.row}>
          <TextField label={t('forgot.username')} className={s.textField} />
        </div>
        <div className={classNames(s.row, s.btnContainer)}>
          <Button variant="contained" color="primary" className={s.btnLogin}>
            {t('forgot.submit')}
          </Button>
        </div>
      </div>
    </div>
  </>
);

export default i18n(Forgot);
