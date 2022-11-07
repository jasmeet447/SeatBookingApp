import { Auth } from 'aws-amplify';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignInComponent from '../Components/SignInComponent';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
    const { email } = this.state;
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
      const { email, password } = this.state;
      this.setState({ isLoading: true });
      const user = await Auth.signIn(email.toLowerCase(), password);
      this.setState({ isLoading: false });
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        this.props.navigation.navigate('ChangePassword', { user, email });
      } else {
        //go to dashboard
        this.saveSession(user, email)
        this.setState({email: '', password: ''})
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'SeatSelection', params: {email, user} }],
        });
        //this.props.navigation.navigate('SeatSelection', { user, email })
      }
    } catch (error) {
      Alert.alert('Error!', error.message);
      this.setState({ isLoading: false });
    }
  }

  saveSession = async (user, email) => {
    try {
      const userJsonValue = JSON.stringify(user)
      await AsyncStorage.setItem('user', userJsonValue)
      await AsyncStorage.setItem('email', email)
    } catch (error) {
      console.log('saveSession===>', error);
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