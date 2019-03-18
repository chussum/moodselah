import autobind from 'autobind-decorator';
import React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { emailSignIn, emailSignInVariables } from '~/types/api';
import { LOG_USER_IN } from '~/sharedQueries.local';
import Login from './Login';
import { EMAIL_SIGN_IN } from './queries';

interface IState {
  email: string;
  password: string;
}
interface IProps extends RouteComponentProps<any> {}

class EmailSignInMutation extends Mutation<emailSignIn, emailSignInVariables> {}

class LoginContainer extends React.Component<IProps, IState> {
  public loginMutation?: MutationFn;
  public emailMutation?: MutationFn<emailSignIn, emailSignInVariables>;
  public state = {
    email: '',
    password: ''
  };

  public render() {
    const { email, password } = this.state;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => {
          this.loginMutation = logUserIn;
          return (
            <EmailSignInMutation
              mutation={EMAIL_SIGN_IN}
              variables={{
                email,
                password
              }}
              onCompleted={this.postEmailMutation}
            >
              {(mutation, { loading }) => {
                this.emailMutation = mutation;
                return (
                  <Login
                    {...this.props}
                    {...this.state}
                    loading={loading}
                    onInputChange={this.onInputChange}
                    onSubmit={this.onSubmit}
                  />
                );
              }}
            </EmailSignInMutation>
          );
        }}
      </Mutation>
    );
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
  private onSubmit(e) {
    e.preventDefault();
    if (this.emailMutation) {
      this.emailMutation();
    }
  }

  @autobind
  private postEmailMutation(data) {
    const { EmailSignIn } = data;
    if (EmailSignIn.success) {
      const { token, user } = EmailSignIn;
      if (this.loginMutation && token) {
        this.loginMutation({
          variables: {
            token,
            user
          }
        });
      }
    } else {
      toast.error(EmailSignIn.error);
    }
  }
}

export default LoginContainer;
