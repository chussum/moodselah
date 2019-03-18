import * as React from 'react';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '~/components/Avatar';
import i18n from '~/helpers/i18n';
import s from './ProfileEdit.module.scss';

export interface ProfileEditProps {
  t: any;
  fileRef: React.RefObject<HTMLInputElement>;
  onClickUploadProfileImage: (event: React.MouseEvent<HTMLElement>) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onChangeFiles: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  userData: any;
  loading: boolean;
  profilePhoto: string;
  profileFilePreview: string;
  email: string;
  nick: string;
  isWorking: boolean;
}

const ProfileEdit: React.SFC<ProfileEditProps> = props => {
  if (props.loading) {
    return null;
  }

  const { GetMyProfile: { user = null } = {} } = props.userData || {};
  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{props.t('profile.edit.title')} - Moodselah</title>
      </Helmet>
      <div className={s.container}>
        <form onSubmit={props.onSubmit}>
          <div className={s.form}>
            <div className={s.subtitle}>{props.t('profile.edit.title')}</div>
            <div className={classNames(s.row, s.avatarRow)}>
              <button type="button" onClick={props.onClickUploadProfileImage}>
                <Avatar user={{ profilePhoto: props.profileFilePreview || props.profilePhoto }} size="xxl" />
              </button>
              <input
                className={s.file}
                ref={props.fileRef}
                type="file"
                onChange={props.onChangeFiles}
                accept=".gif,.jpg,.jpeg,.png"
                disabled={props.isWorking}
              />
            </div>
            {/* <div className={classNames(s.row, s.leaveRow)}>
              <button type="button">회원탈퇴</button>
            </div> */}
            <div className={s.row}>
              <TextField
                name="email"
                label={props.t('profile.edit.username')}
                className={s.textField}
                value={props.email}
                onChange={props.onInputChange}
                autoComplete="username"
                disabled={props.isWorking}
              />
            </div>
            <div className={s.row}>
              <TextField
                name="nick"
                label={props.t('profile.edit.nick')}
                value={props.nick}
                className={s.textField}
                onChange={props.onInputChange}
                autoComplete="nick"
                disabled={props.isWorking}
              />
            </div>
            <div className={s.row}>
              <TextField
                name="password"
                type="password"
                label={props.t('profile.edit.password')}
                className={s.textField}
                onChange={props.onInputChange}
                autoComplete="new-password"
                disabled={props.isWorking}
              />
            </div>
            <div className={s.row}>
              <TextField
                name="confirmPassword"
                type="password"
                label={props.t('profile.edit.confirmPassword')}
                className={s.textField}
                onChange={props.onInputChange}
                autoComplete="new-password"
                disabled={props.isWorking}
              />
            </div>
            <div className={classNames(s.row, s.btnContainer)}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={s.btnLogin}
                disabled={props.isWorking}
              >
                {props.t('profile.edit.submit')}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default i18n(ProfileEdit);
