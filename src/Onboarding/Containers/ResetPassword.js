import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { getAuthErrorMessage } from '../../Helper';
import { VALIDATION_REGX } from '../../Globals/Strings';
import ResetPasswordComponent from '../Components/ResetPasswordComponent';

const ResetPassword = ({ navigation, route }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [confirmsMinLength, setConfirmsMinLength] = useState(false);
  const [haveUppercaseLetter, setHaveUppercaseLetter] = useState(false);
  const [haveLowercaseLetter, setHaveLowercaseLetter] = useState(false);
  const [haveNumber, setHaveNumber] = useState(false);
  const [haveSpecialCharacter, setHaveSpecialCharacter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const email = route.params.email;
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const [isInvalid, setInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const confirmPasswordField = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const isSuccess = () => {
    if (newPassword && confirmNewPassword) {
      return newPassword.trim() === confirmNewPassword.trim();
    } else {
      return false;
    }
  }

  const doesPasswordMatch = () =>
    newPassword.trim() &&
    newPassword === confirmNewPassword;

  const isFormEmpty = () =>
    !(
      /\d{6}/.test(resetCode ?? '') &&
      resetCode?.length == 6 &&
      newPassword &&
      confirmNewPassword &&
      confirmsMinLength &&
      haveUppercaseLetter &&
      haveLowercaseLetter &&
      haveNumber &&
      haveSpecialCharacter &&
      doesPasswordMatch()
    );


  const onChangePassword = (password) => {
    setNewPassword(password);
    setConfirmsMinLength(password.length > 7);
    setHaveUppercaseLetter(/[A-Z]/.test(password))
    setHaveLowercaseLetter(/[a-z]/.test(password))
    setHaveNumber(/\d/.test(password))
    setHaveSpecialCharacter(VALIDATION_REGX.specialCharacter.test(password))
  };

  const onChangeConfirmPassword = password => {
    setConfirmNewPassword(password);
  };

  const focusConfirmPasswordField = () =>
    confirmPasswordField.current?._root?.focus();

  const logout = () => {
    setLoading(true);
    Auth.signOut().then(() => {
      setShowModal(false);
      navigation.navigate('SignIn', { email: email })
      setLoading(false);
    }).catch(() => {
      Alert.alert('Error', 'Error Processing Request');
      setShowModal(false);
      setLoading(false);
    })
  }

  const resetPassword = async () => {
    if (email && resetCode) {
      try {
        setLoading(true);
        const forgotPasswordSubmitResponse = await Auth.forgotPasswordSubmit(email, resetCode, newPassword)
        if (forgotPasswordSubmitResponse && forgotPasswordSubmitResponse != null) {
          setShowModal(true)
        }
        setLoading(false);
      } catch (forgotPasswordSubmitError) {
        if (forgotPasswordSubmitError && forgotPasswordSubmitError != null) {
          setInvalid(true);
          setErrorMsg('Please enter a valid code.');
        }
        setLoading(false); 
      }
    } else {
      onAlert()
    }
  }

  const onAlert = () => {
    setShowModalAlert(true);
  }

  const onPressPrimaryButton = () => {
    navigation.goBack(null);
    closeIntelliconectMigrationModel();
  }

  const closeIntelliconectMigrationModel = () => {
    setShowModalAlert(false);
  }

  const onModalHide = isModalClosed => {
    setShowModal(isModalClosed);
    setNewPassword('');
    setConfirmNewPassword('');
    setConfirmsMinLength(false);
    setHaveUppercaseLetter(false);
    setHaveLowercaseLetter(false);
    setHaveNumber(false);
    setHaveSpecialCharacter(false);
  };

  const onChangeCode = text => {
    setResetCode(text);
  };

  const onResendCode = async () => {
    try {
      setLoading(true);
      const forgotPasswordResponse = Auth.forgotPassword(email);
      if (forgotPasswordResponse && forgotPasswordResponse != null) {
        Alert.alert('Success', "We've sent you an email with a 6-digit code. Please check your email and enter the code below.");
      }
      setLoading(false);
    } catch (forgotPasswordError) {
      if (forgotPasswordError && forgotPasswordError != null) {
        Alert.alert('Error', getAuthErrorMessage(forgotPasswordError?.code));
      }
      setLoading(false);
    }
  };

  return (
    <ResetPasswordComponent
      navigation={navigation}
      resetPassword={resetPassword}
      isFormEmpty={isFormEmpty}
      confirmsMinLength={confirmsMinLength}
      haveUppercaseLetter={haveUppercaseLetter}
      haveLowercaseLetter={haveLowercaseLetter}
      haveNumber={haveNumber}
      haveSpecialCharacter={haveSpecialCharacter}
      newPassword={newPassword}
      onChangePassword={onChangePassword}
      focusConfirmPasswordField={focusConfirmPasswordField}
      confirmNewPassword={confirmNewPassword}
      onChangeConfirmPassword={onChangeConfirmPassword}
      logout={logout}
      onModalHide={onModalHide}
      isLoading={isLoading}
      showModal={showModal}
      isSuccess={isSuccess}
      leftText={'Sign In'}
      title={'Set New Password'}
      input1Props={{
        label: 'New Password',
        placeholder: 'Password'
      }}
      input2Props={{
        label: 'Confirm New Password',
        placeholder: 'Confirm Password',
        ref: confirmPasswordField,
      }}
      modalContentProps={{
        titleText: 'Password Changed',
        bodyText: 'Your password has been successfully changed.',
        primaryButtonLabel: 'Continue'
      }}
      atleastEightCharText={'At least 8 characters'}
      oneUpperLetterText={'1 uppercase and 1 lowercase letter'}
      oneNumberText={'1 number'}
      oneSpecialCharText={'1 special character'}
      buttonText={'Submit'}
      showModalAlert={showModalAlert}
      modelAlertProps={
        {
          onPressPrimaryButton: onPressPrimaryButton,
          onPressSecondaryButton: closeIntelliconectMigrationModel,
          isSecondaryButtonVisible: true,
          type: 'error',
          titleText: '',
          bodyText: 'Oh no! Something went wrong. Can you please try again?'
        }
      }
      headingText={'Check Your Email'}
      bodyText={"We've sent you an email with a 6-digit code. Please check your email and enter the code below."}
      label={'6-digit code'}
      inputValue={resetCode}
      inputOnChangeText={onChangeCode}
      isInvalid={isInvalid}
      errorMsg={errorMsg}
      onResendCode={onResendCode}
      resendButtonText={'Re-Send Code'}
    />
  );
}

export default ResetPassword;