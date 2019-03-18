import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import autobind from 'autobind-decorator';
import { toast } from 'react-toastify';
import { addPost, addPostVariables } from '~/types/api';
import { toImageFiles, getGPSLocation } from '~/helpers/file';
import PostWrite, { Photo } from './PostWrite';
import { ADD_POST } from './queries';
import { GET_POSTS } from '../Main/queries';
import { GET_USER } from '../Profile/queries';

export interface PostWriteContainerProps extends RouteComponentProps {
  user: any;
}

export interface PostWriteContainerState {
  isVisiblePostCodeModal: boolean;
  isWorking: boolean;
  content: string;
  photos: Photo[];
  wifi: number;
  childChair: number;
  study: number;
  files: File[];
  address: string;
  lat?: number;
  lng?: number;
}

type Position = {
  lat: number;
  lng: number;
  roadAddr: string;
  jibunAddr: string;
};

const makePhoto = (file: File, id: number): Photo => ({
  __typename: 'Photo',
  id,
  title: '',
  content: '',
  path: URL.createObjectURL(file)
});

class AddPostMutation extends Mutation<addPost, addPostVariables> {}

class PostWriteContainer extends React.Component<PostWriteContainerProps, PostWriteContainerState> {
  public addPostMutation?: MutationFn<addPost, addPostVariables>;
  public state: PostWriteContainerState = {
    isVisiblePostCodeModal: false,
    isWorking: false,
    content: '',
    photos: [],
    files: [],
    wifi: 0,
    childChair: 0,
    study: 0,
    address: '',
    lat: undefined,
    lng: undefined
  };

  public componentDidUpdate(prevProps: PostWriteContainerProps, prevState: PostWriteContainerState) {
    if (prevState.photos !== this.state.photos) {
      prevState.photos.map(photo => URL.revokeObjectURL(photo.path));
    }
  }

  public componentWillUnmount() {
    const { photos } = this.state;
    photos.map(photo => URL.revokeObjectURL(photo.path));
  }

  @autobind
  private async onChangeFiles(e) {
    if (this.state.isWorking) {
      return;
    }
    const uploadFiles = e.target.files;
    if (!uploadFiles || !uploadFiles.length) {
      return;
    }
    this.setState({ isWorking: true });
    try {
      const { address, lat, lng } = await getGPSLocation(uploadFiles[0]);
      this.setState({ address, lat, lng });
    } catch (e) {
      // nothing to do
    }
    const files: File[] = await toImageFiles(uploadFiles);
    const photos: Photo[] = files.map(makePhoto);
    this.setState({ isWorking: false, files, photos });
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
  private async onSubmit(e) {
    e.preventDefault();
    if (this.state.isWorking) {
      return;
    }
    this.setState({ isWorking: true });
    if (this.addPostMutation) {
      try {
        await this.addPostMutation();
      } catch (e) {
        // nothing to do
      }
      this.setState({ isWorking: false });
    }
  }

  @autobind
  private postAddPostMutation(data) {
    const { history } = this.props;
    const { AddPost } = data;
    if (AddPost.success) {
      const { post } = AddPost;
      setTimeout(() => {
        history.push({
          pathname: `/posts/${post.id}`
        });
      });
    } else {
      toast.error(AddPost.error);
    }
  }

  @autobind
  onChangeMarkerPosition({ roadAddr, jibunAddr, lat, lng }: Position) {
    this.setState({ address: roadAddr || jibunAddr, lat, lng });
  }

  @autobind
  onChangeSwitchButton(e) {
    const { name, value } = e.target;
    this.setState({ [name]: +value } as any);
  }

  @autobind
  onOpenPostCodeModal() {
    this.setState({ isVisiblePostCodeModal: true });
  }

  @autobind
  onClosePostCodeModal() {
    this.setState({ isVisiblePostCodeModal: false });
  }

  render() {
    const { content, files, address, lat, lng, wifi, childChair, study } = this.state;
    const { user: { nick = '' } = {} } = this.props;
    return (
      <AddPostMutation
        mutation={ADD_POST}
        variables={{
          content,
          files,
          wifi,
          childChair,
          study,
          address,
          lat,
          lng
        }}
        onCompleted={this.postAddPostMutation}
        refetchQueries={[
          {
            query: GET_POSTS,
            variables: { skip: 0 }
          },
          {
            query: GET_USER,
            variables: { skip: 0, nick, where: "{ 'author.nick': nick }" }
          }
        ]}
      >
        {(mutation, { loading }) => {
          this.addPostMutation = mutation;
          return (
            <PostWrite
              {...this.props}
              {...this.state}
              loading={loading}
              onChangeMarkerPosition={this.onChangeMarkerPosition}
              onChangeSwitchButton={this.onChangeSwitchButton}
              onChangeFiles={this.onChangeFiles}
              onChangeTextField={this.onChangeTextField}
              onOpenPostCodeModal={this.onOpenPostCodeModal}
              onClosePostCodeModal={this.onClosePostCodeModal}
              onCompletePostCode={this.onCompletePostCode}
              onSubmit={this.onSubmit}
            />
          );
        }}
      </AddPostMutation>
    );
  }
}

export default PostWriteContainer;
