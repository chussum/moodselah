import autobind from 'autobind-decorator';
import React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LOG_USER_IN } from '~/sharedQueries.local';
import { emailSignUp, emailSignUpVariables } from '~/types/api';
import { EMAIL_SIGN_UP } from './queries';
import Register from './Register';

interface IState {
  email: string;
  nick: string;
  password: string;
  confirmPassword: string;
}

interface IProps extends RouteComponentProps<any> {}

class EmailSignUpMutation extends Mutation<emailSignUp, emailSignUpVariables> {}

class RegisterContainer extends React.Component<IProps, IState> {
  public loginMutation?: MutationFn;
  public registerMutation?: MutationFn<emailSignUp, emailSignUpVariables>;
  public state = {
    email: '',
    nick: '',
    password: '',
    confirmPassword: ''
  };

  public render() {
    const { email, nick, password, confirmPassword } = this.state;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => {
          this.loginMutation = logUserIn;
          return (
            <EmailSignUpMutation
              mutation={EMAIL_SIGN_UP}
              variables={{
                email,
                nick,
                password,
                confirmPassword
              }}
              onCompleted={this.postRegiterMutation}
            >
              {(mutaion, { loading }) => {
                this.registerMutation = mutaion;
                return (
                  <Register
                    {...this.props}
                    {...this.state}
                    loading={loading}
                    onInputChange={this.onInputChange}
                    onSubmit={this.onSubmit}
                  />
                );
              }}
            </EmailSignUpMutation>
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
    if (this.registerMutation) {
      this.registerMutation();
    }
  }

  @autobind
  private postRegiterMutation(data) {
    const { EmailSignUp } = data;
    if (EmailSignUp.success) {
      const { token, user } = EmailSignUp;
      if (this.loginMutation && token) {
        this.loginMutation({
          variables: {
            token,
            user
          }
        });
      }
    } else {
      toast.error(EmailSignUp.error);
    }
  }
}

export default RegisterContainer;
