import React, {Component} from 'react';
import { Auth } from 'aws-amplify';
import SignInComponent from '../Components/SignInComponent';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.route.params.email,
            password: '',
            showPassword: false,
            isLoading: false,
            forgetEmail: '',
            invalidResetEmail: false,
            invalidEmail: false,
            error: "",
        }
    }

  onChangeText = viewId => text => {
    this.setState({ [viewId]: text, error: '' });
  };

  navigateToForgotPassword = () => {
    const {email} = this.state;
    this.props.navigation.navigate('ForgotPassword', {
      email
    })
  }
  
  goToBack = () => this.props.navigation.goBack();

  isFormEmpty = () => !this.state.email || !this.state.password;

  onSignInPress = async () => {
    try {
      if (this.isFormEmpty()) {
        return
      }
      const {email, password} = this.state;
      this.setState({isLoading: true});
      const response = await Auth.signIn(email.toLowerCase(), password);
      this.setState({isLoading: false});
      alert('SignIn Success!')
      console.log('onSignInPress===>', response);
    } catch (error) {
      console.log('onSignInPress===>', error);
      this.setState({isLoading: false});
    }
  }

  render() {
    return (
      <SignInComponent
        state={this.state}
        headerProps={{
            isLeftDisabled: true,
            isRightDisabled: true
        }}
        headingText={'Looks like you already have a Pentair account!'}
        bodyText={'Sign in to go to your account.'}
        isFormEmpty={this.isFormEmpty}
        onSignInPress={this.onSignInPress}
        onChangeText={this.onChangeText}
        navigateToForgotPassword={this.navigateToForgotPassword}
        goToBack={this.goToBack}
        buttonText={'Sign In'}
        switchAccountText={'Switch Account'}
        input1Label={'Email Address'}
        input1Placeholder={'Email Address'}
        input2Label={'Password'}
        input2Placeholder={'Password'}
        forgotPasswordText={'Forgot Password?'}
      />
    );
  }
}


export default SignIn;