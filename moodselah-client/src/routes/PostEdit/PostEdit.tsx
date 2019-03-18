import React from 'react';
import Helmet from 'react-helmet';
import { RouteComponentProps } from 'react-router-dom';
import { Mutation, MutationFn } from 'react-apollo';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import autobind from 'autobind-decorator';
import { toast } from 'react-toastify';
import PhotoSlider from '~/components/PhotoSlider';
import Map from '~/components/Map';
import PostCodeModal from '~/components/PostCodeModal';
import SwitchButton from '~/components/SwitchButton';
import i18n from '~/helpers/i18n';
import { getPost, editPost, editPostVariables } from '~/types/api';
import { GET_POST } from '../PostView/queries';
import { EDIT_POST } from './queries';
import s from './PostEdit.module.scss';

type latLng = { roadAddr?: string; jibunAddr?: string; lat: number; lng: number };

export interface PostEditProps extends RouteComponentProps {
  t: (keyword: string) => string;
  loading: boolean;
  data: getPost;
  user?: any;
}

export interface PostEditState {
  isVisiblePostCodeModal: boolean;
  isWorking: boolean;
  id: number;
  content: string;
  wifi: number;
  childChair: number;
  study: number;
  address: string;
  lat?: number;
  lng?: number;
}

class EditPostMutation extends Mutation<editPost, editPostVariables> {}

class PostEdit extends React.Component<PostEditProps, PostEditState> {
  public editPostMutation?: MutationFn<editPost, editPostVariables>;

  constructor(props: PostEditProps) {
    super(props);
    const { GetPost: { post = null } = {} } = props.data;
    this.state = {
      isVisiblePostCodeModal: false,
      isWorking: false,
      id: post ? +post.id : 0,
      content: post ? post.content : '',
      wifi: post ? post.wifi : 0,
      childChair: post ? post.childChair : 0,
      study: post ? post.study : 0,
      address: post && post.place ? post.place.address : '',
      lat: post && post.place ? post.place.lat : undefined,
      lng: post && post.place ? post.place.lat : undefined
    };
    const { user } = this.props;
    const loggedUserId = user && user.id;
    const postedUserId = (post && post.author && post.author.id) || 0;
    if (+loggedUserId !== +postedUserId) {
      toast.error('잘못된 접근입니다.');
      props.history.push({ pathname: '/' });
    }
  }

  @autobind
  private onChangeTextField(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value } as any);
  }

  @autobind
  private onCompletePostCode(data) {
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    this.setState({ address: fullAddress, isVisiblePostCodeModal: false });
  }

  @autobind
  private onSubmit(e) {
    e.preventDefault();
    if (this.editPostMutation) {
      this.editPostMutation();
    }
  }

  @autobind
  private postEditPostMutation(data) {
    const { history } = this.props;
    const { EditPost } = data;
    if (EditPost.success) {
      const { post } = EditPost;
      setTimeout(() => {
        history.push({
          pathname: `/posts/${post.id}`
        });
      });
    } else {
      toast.error(EditPost.error);
    }
  }

  @autobind
  onChangeMarkerPosition({ roadAddr, jibunAddr, lat, lng }: latLng) {
    this.setState({ address: roadAddr || jibunAddr || '', lat, lng });
  }

  @autobind
  onOpenPostCodeModal() {
    this.setState({ isVisiblePostCodeModal: true });
  }

  @autobind
  onClosePostCodeModal() {
    this.setState({ isVisiblePostCodeModal: false });
  }

  @autobind
  onChangeSwitchButton(e) {
    const { name, value } = e.target;
    this.setState({ [name]: +value } as any);
  }

  render() {
    if (this.props.loading) {
      return null;
    }
    const { GetPost: { post = null } = {} } = this.props.data || {};
    if (!post) {
      return null;
    }
    const { id, content, wifi, childChair, study, address, lat, lng, isWorking } = this.state;
    return (
      <>
        <Helmet>
          <title>{this.props.t('post.edit.title')} - Moodselah</title>
        </Helmet>
        <EditPostMutation
          mutation={EDIT_POST}
          variables={{
            id,
            content,
            wifi,
            childChair,
            study,
            address,
            lat,
            lng
          }}
          onCompleted={this.postEditPostMutation}
          refetchQueries={[
            {
              query: GET_POST,
              variables: { id }
            }
          ]}
        >
          {(mutation, { loading }) => {
            this.editPostMutation = mutation;
            return (
              <>
                <form className={s.container} onSubmit={this.onSubmit}>
                  <div className={s.row}>
                    <PhotoSlider photos={post.photos} />
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
                                disabled={isWorking}
                                checked={+wifi === 2}
                                onChange={this.onChangeSwitchButton}
                              />
                              <label htmlFor="wifi-no">없음</label>
                              <input
                                id="wifi-yes"
                                name="wifi"
                                type="radio"
                                value="1"
                                disabled={isWorking}
                                checked={+wifi === 1}
                                onChange={this.onChangeSwitchButton}
                              />
                              <label htmlFor="wifi-yes">있음</label>
                              <input
                                id="wifi-default"
                                name="wifi"
                                type="radio"
                                value="0"
                                disabled={isWorking}
                                checked={+wifi === 0}
                                onChange={this.onChangeSwitchButton}
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
                                disabled={isWorking}
                                checked={+childChair === 2}
                                onChange={this.onChangeSwitchButton}
                              />
                              <label htmlFor="child-chair-no">없음</label>
                              <input
                                id="child-chair-yes"
                                name="childChair"
                                type="radio"
                                value="1"
                                disabled={isWorking}
                                checked={+childChair === 1}
                                onChange={this.onChangeSwitchButton}
                              />
                              <label htmlFor="child-chair-yes">있음</label>
                              <input
                                id="child-chair-default"
                                name="childChair"
                                type="radio"
                                value="0"
                                disabled={isWorking}
                                checked={+childChair === 0}
                                onChange={this.onChangeSwitchButton}
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
                                disabled={isWorking}
                                checked={+study === 2}
                                onChange={this.onChangeSwitchButton}
                              />
                              <label htmlFor="study-no">부적합</label>
                              <input
                                id="study-yes"
                                name="study"
                                type="radio"
                                value="1"
                                disabled={isWorking}
                                checked={+study === 1}
                                onChange={this.onChangeSwitchButton}
                              />
                              <label htmlFor="study-yes">적합</label>
                              <input
                                id="study-default"
                                name="study"
                                type="radio"
                                value="0"
                                disabled={isWorking}
                                checked={+study === 0}
                                onChange={this.onChangeSwitchButton}
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
                      value={content}
                      onChange={this.onChangeTextField}
                      disabled={isWorking}
                      variant="outlined"
                    />
                  </div>
                  <div className={classNames(s.row, s.addressTextRow)}>
                    <TextField
                      className={classNames(s.textField, s.addressTextField)}
                      name="address"
                      label="(선택) 주소"
                      value={address}
                      onChange={this.onChangeTextField}
                      onClick={this.onOpenPostCodeModal}
                      disabled={true}
                      variant="outlined"
                    />
                    <Button
                      className={s.btnAddressFind}
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={this.onOpenPostCodeModal}
                      disabled={isWorking}
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
                      address={address}
                      maxZoomLevel={2}
                      onChangeMarkerPosition={this.onChangeMarkerPosition}
                    />
                  </div>
                  <div className={classNames(s.row, s.buttonContainer)}>
                    <Button
                      className={s.btnSubmit}
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={this.state.isWorking}
                    >
                      수정하기
                    </Button>
                  </div>
                </form>
                <PostCodeModal
                  onComplete={this.onCompletePostCode}
                  onClose={this.onClosePostCodeModal}
                  isVisible={this.state.isVisiblePostCodeModal}
                />
              </>
            );
          }}
        </EditPostMutation>
      </>
    );
  }
}

export default i18n(PostEdit);
