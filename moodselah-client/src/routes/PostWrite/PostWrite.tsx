import * as React from 'react';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import PhotoSlider from '~/components/PhotoSlider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Map from '~/components/Map';
import PostCodeModal from '~/components/PostCodeModal';
import SwitchButton from '~/components/SwitchButton';
import i18n from '~/helpers/i18n';
import s from './PostWrite.module.scss';

export interface Photo {
  __typename: 'Photo';
  id: number;
  title: string;
  content: string;
  path: string;
}

interface IProps {
  t: any;
  isVisiblePostCodeModal: boolean;
  isWorking: boolean;
  loading: boolean;
  files: File[];
  photos: Photo[];
  content: string;
  address: string;
  lat: number;
  lng: number;
  wifi: number;
  childChair: number;
  study: number;
  onChangeMarkerPosition: (position: any) => void;
  onChangeSwitchButton: (e) => void;
  onChangeTextField: (e) => void;
  onChangeFiles: (e) => void;
  onOpenPostCodeModal: () => void;
  onClosePostCodeModal: () => void;
  onCompletePostCode: (data) => void;
  onSubmit: (e) => void;
}

const PostWrite: React.SFC<IProps> = props => (
  <>
    <Helmet>
      <title>{props.t('post.write.title')} - Moodselah</title>
    </Helmet>
    <form className={s.container} onSubmit={props.onSubmit}>
      <PhotoSlider photos={props.photos} />
      <div className={classNames(s.row, s.fileContainer)}>
        <input
          type="file"
          onChange={props.onChangeFiles}
          multiple={true}
          accept=".gif,.jpg,.jpeg,.png"
          disabled={props.isWorking}
        />
      </div>
      <div className={s.row}>
        <table className={s.information}>
          <tbody>
            <tr className={'mobile-show'}>
              <td colSpan={2}>와이파이</td>
            </tr>
            <tr className={s.marginBottom8}>
              <th className={'mobile-hide'}>
                <img src="/img/icon/wifi-active.png" alt="wifi" />
                와이파이
              </th>
              <td>
                <SwitchButton containerClassName={s.switchButton}>
                  <input
                    id="wifi-no"
                    name="wifi"
                    type="radio"
                    value="2"
                    disabled={props.isWorking}
                    checked={+props.wifi === 2}
                    onChange={props.onChangeSwitchButton}
                  />
                  <label htmlFor="wifi-no">없음</label>
                  <input
                    id="wifi-yes"
                    name="wifi"
                    type="radio"
                    value="1"
                    disabled={props.isWorking}
                    checked={+props.wifi === 1}
                    onChange={props.onChangeSwitchButton}
                  />
                  <label htmlFor="wifi-yes">있음</label>
                  <input
                    id="wifi-default"
                    name="wifi"
                    type="radio"
                    value="0"
                    disabled={props.isWorking}
                    checked={+props.wifi === 0}
                    onChange={props.onChangeSwitchButton}
                  />
                  <label htmlFor="wifi-default">모름</label>
                </SwitchButton>
              </td>
            </tr>
            <tr className={'mobile-show'}>
              <td colSpan={2}>아기의자</td>
            </tr>
            <tr className={s.marginBottom8}>
              <th className={'mobile-hide'}>
                <img src="/img/icon/chair-active.png" alt="chair" />
                아기의자
              </th>
              <td>
                <SwitchButton containerClassName={s.switchButton}>
                  <input
                    id="child-chair-no"
                    name="childChair"
                    type="radio"
                    value="2"
                    disabled={props.isWorking}
                    checked={+props.childChair === 2}
                    onChange={props.onChangeSwitchButton}
                  />
                  <label htmlFor="child-chair-no">없음</label>
                  <input
                    id="child-chair-yes"
                    name="childChair"
                    type="radio"
                    value="1"
                    disabled={props.isWorking}
                    checked={+props.childChair === 1}
                    onChange={props.onChangeSwitchButton}
                  />
                  <label htmlFor="child-chair-yes">있음</label>
                  <input
                    id="child-chair-default"
                    name="childChair"
                    type="radio"
                    value="0"
                    disabled={props.isWorking}
                    checked={+props.childChair === 0}
                    onChange={props.onChangeSwitchButton}
                  />
                  <label htmlFor="child-chair-default">모름</label>
                </SwitchButton>
              </td>
            </tr>
            <tr className={'mobile-show'}>
              <td colSpan={2}>스터디하기엔</td>
            </tr>
            <tr className={s.marginBottom8}>
              <th className={'mobile-hide'}>
                <img src="/img/icon/school-active.png" alt="study" />
                스터디하기엔
              </th>
              <td>
                <SwitchButton containerClassName={s.switchButton}>
                  <input
                    id="study-no"
                    name="study"
                    type="radio"
                    value="2"
                    disabled={props.isWorking}
                    checked={+props.study === 2}
                    onChange={props.onChangeSwitchButton}
                  />
                  <label htmlFor="study-no">부적합</label>
                  <input
                    id="study-yes"
                    name="study"
                    type="radio"
                    value="1"
                    disabled={props.isWorking}
                    checked={+props.study === 1}
                    onChange={props.onChangeSwitchButton}
                  />
                  <label htmlFor="study-yes">적합</label>
                  <input
                    id="study-default"
                    name="study"
                    type="radio"
                    value="0"
                    disabled={props.isWorking}
                    checked={+props.study === 0}
                    onChange={props.onChangeSwitchButton}
                  />
                  <label htmlFor="study-default">모름</label>
                </SwitchButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={s.row}>
        <TextField
          className={s.textField}
          name="content"
          label="(필수) 한마디"
          multiline={true}
          rows={6}
          rowsMax={20}
          value={props.content}
          onChange={props.onChangeTextField}
          disabled={props.isWorking}
          variant="outlined"
        />
      </div>
      <div className={classNames(s.row, s.addressTextRow)}>
        <TextField
          className={classNames(s.textField, s.addressTextField)}
          name="address"
          label="(선택) 주소"
          value={props.address}
          onChange={props.onChangeTextField}
          onClick={props.onOpenPostCodeModal}
          disabled={true}
          variant="outlined"
        />
        <Button
          className={s.btnAddressFind}
          type="button"
          variant="contained"
          color="primary"
          onClick={props.onOpenPostCodeModal}
          disabled={props.isWorking}
        >
          주소 검색
        </Button>
      </div>
      <div className={s.row}>
        <Map
          className={s.map}
          initialOption={{
            level: 4
          }}
          address={props.address}
          maxZoomLevel={2}
          onChangeMarkerPosition={props.onChangeMarkerPosition}
        />
      </div>
      <div className={classNames(s.row, s.buttonContainer)}>
        <Button className={s.btnSubmit} type="submit" variant="contained" color="primary" disabled={props.isWorking}>
          글작성
        </Button>
      </div>
    </form>
    <PostCodeModal
      onComplete={props.onCompletePostCode}
      onClose={props.onClosePostCodeModal}
      isVisible={props.isVisiblePostCodeModal}
    />
  </>
);

export default i18n(PostWrite);
