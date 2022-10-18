import React, { useCallback, useState } from 'react';
import { checkIfUserExist } from '../../Common_Feature/Services/Profile';
import { VALIDATION_REGX } from '../../Globals/Strings';
import { getAuthErrorMessage } from '../../Helper';
import WelcomeComponent from '../Components/WelcomeComponent';

const Welcome = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState();
  const [emailAddress, setEmailAddress] = useState('');
  const [error, setError] = useState();

  const onChangeText = (text) => {
    if (error) {
      setError('')
    }
    setEmailAddress(text)
  }

  const validateEmail = emailAddress => {
    const email = emailAddress?.trim?.() || '';
    if (!email || !VALIDATION_REGX.email.test(email)) {
      throw new Error('Please enter a valid email');
    }
    return email;
  };

  const onFindMyInfoPress = useCallback(async () => {
    try {
      setIsLoading(true);
      const email = validateEmail(emailAddress);
      setError('');
      let isUser
      try {
        isUser = await checkIfUserExist(email.toLowerCase())
      } catch (error) { }
      if (isUser) {
        navigation.navigate('SignIn', { email: email });
      } else {
        alert("Username doesn't exist");
      }
    } catch (err) {
      console.log("Error ", err);
      setIsLoading(false);
      if (err.code === undefined) {
        setError(err?.message)
      }
      else {
        setError(getAuthErrorMessage(err?.code));
      }
    }
    setIsLoading(false);
  }, [emailAddress]);

  return (
    <WelcomeComponent
      headerProps={{isLeftDisabled: true}}
      isLoading={isLoading}
      emailAddress={emailAddress}
      onChangeText={onChangeText}
      error={error}
      onFindMyInfoPress={onFindMyInfoPress}
      headingText={'Welcome to the Pentair Home app!'}
      bodyText={'Get the most out of your home’s water.\n\nEnter your email to get started.'.replace('\n', '')}
      placeholder={'Email Address'}
      label={'Email Address'}
      buttonText={'Get Started'}
      isButtonDisable={!emailAddress.trim()}
    />
  );
};

export default Welcome;