import * as React from 'react';
import { Query, Mutation, MutationFn } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import autobind from 'autobind-decorator';
import { toast } from 'react-toastify';
import { userProfile, UpdateMyProfile, UpdateMyProfileVariables } from '~/types/api';
import { toImageFile } from '~/helpers/file';
import { USER_PROFILE } from '~/sharedQueries';
import { UPDATE_MY_PROFILE } from './queries';
import ProfileEdit from './ProfileEdit';

interface IProps extends RouteComponentProps {
  location: any;
  match: any;
  loading: boolean;
  userData: any;
}

interface IState {
  isWorking: boolean;
  profilePhoto: string;
  profileFile: File | null;
  profileFilePreview: string;
  email: string;
  nick: string;
  password: string;
  confirmPassword: string;
}

class UserProfileQuery extends Query<userProfile> {}
class UpdateMyProfileMutation extends Mutation<UpdateMyProfile, UpdateMyProfileVariables> {}

class ProfileContainer extends React.Component<IProps, IState> {
  public editMutation?: MutationFn<UpdateMyProfile, UpdateMyProfileVariables>;
  public fileRef: React.RefObject<HTMLInputElement> = React.createRef();

  constructor(props) {
    super(props);
    const { GetMyProfile: { user = null } = {} } = props.userData || {};
    this.state = {
      isWorking: false,
      profilePhoto: user.profilePhoto,
      profileFile: null,
      profileFilePreview: '',
      email: user.email,
      nick: user.nick,
      password: '',
      confirmPassword: ''
    };
  }

  @autobind
  private onClickUploadProfileImage(e) {
    e.preventDefault();
    if (this.fileRef.current) {
      this.fileRef.current.click();
    }
  }

  @autobind
  private onInputChange(e) {
    const {
      target: { name, value }
    } = e;
    this.setState({
      [name]: value
    } as any);
  }

  @autobind
  private async onChangeFiles(e) {
    if (this.state.isWorking) {
      return;
    }
    try {
      this.setState({ isWorking: true });
      const file: File = await toImageFile(e.target.files[0]);
      this.setState({ isWorking: false, profileFile: file, profileFilePreview: URL.createObjectURL(file) });
    } catch (e) {
      this.setState({ isWorking: false });
    }
  }

  @autobind
  private async onSubmit(e) {
    e.preventDefault();
    if (this.state.isWorking) {
      return;
    }
    this.setState({ isWorking: true });
    if (this.editMutation) {
      try {
        await this.editMutation();
      } catch (e) {
        // nothing to do
      }
      this.setState({ isWorking: false });
    }
  }

  @autobind
  private postEditMutation(data) {
    const { UpdateMyProfile } = data;
    if (UpdateMyProfile.success) {
      location.href = '/';
    } else {
      toast.error(UpdateMyProfile.error);
    }
  }

  public render() {
    const { profileFile, email, nick, password, confirmPassword } = this.state;
    return (
      <UpdateMyProfileMutation
        mutation={UPDATE_MY_PROFILE}
        variables={{ profileFile, email, nick, password, confirmPassword }}
        onCompleted={this.postEditMutation}
      >
        {mutation => {
          this.editMutation = mutation;
          return (
            <ProfileEdit
              {...this.props}
              {...this.state}
              fileRef={this.fileRef}
              onInputChange={this.onInputChange}
              onChangeFiles={this.onChangeFiles}
              onClickUploadProfileImage={this.onClickUploadProfileImage}
              onSubmit={this.onSubmit}
            />
          );
        }}
      </UpdateMyProfileMutation>
    );
  }
}

export default props => (
  <UserProfileQuery query={USER_PROFILE}>
    {({ data: userData, loading }) => {
      if (loading) {
        return null;
      }
      const { GetMyProfile: { user = null } = {} } = userData || {};
      if (!user) {
        return null;
      }
      return <ProfileContainer {...props} loading={loading} userData={userData} />;
    }}
  </UserProfileQuery>
);
