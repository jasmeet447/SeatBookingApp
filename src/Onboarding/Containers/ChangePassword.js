import React from 'react';
import { Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { getAuthErrorMessage } from '../../Helper';
import { VALIDATION_REGX } from '../../Globals/Strings';
import ChangePasswordComponent from '../../Onboarding/Components/ChangePasswordComponent';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            errorMessage: '',
            currentPassword: '',
            currentPasswordError: '',
            splCharAvail: false,
            numCharAvail: false,
            eightCharsAvail: false,
            upperCharAvail: false,
            showProgress: false,
            isNewPasswordMatch: false,
            newPassword: '',
            confirmNewPassword: "",
            haveLowercaseLetter: false,
        };
    }

    setComponentState = (obj = {}, callback) => {
        this.setState(obj, callback);
    };

    resetPassword = () => {
        this.setState({ showProgress: true });
        Auth.signIn(this.props.route.params.email, this.state.currentPassword)
        .then(user => Auth.completeNewPassword(user, this.state.newPassword, {}))
        .then(response => {
            console.log('Response=====>', response);
            this.setState({ showProgress: false });
        })
        .catch(error => {
            console.log('Error=====>', error);
            this.setState({ showProgress: false });
            this.handleError(error);
        });
    };

    handleError = error => {
        if (error?.code === 'NotAuthorizedException') {
            this.setComponentState({
                currentPasswordError: 'The password is incorrect.',
                showProgress: false,
            });
        }
        else {
            this.setComponentState({
                showProgress: false,
            });
            Alert.alert('Error', getAuthErrorMessage(error?.code));
        }
    }

    handleInputChange = val => {
        if (val) {
            this.setComponentState({
                eightCharsAvail: val.length > 7,
                upperCharAvail: /[A-Z]/.test(val),
                haveLowercaseLetter: /[a-z]/.test(val),
                numCharAvail: /\d/.test(val),
                splCharAvail: VALIDATION_REGX.specialCharacter.test(val),
            });
        } else {
            this.setComponentState({
                splCharAvail: false,
                numCharAvail: false,
                eightCharsAvail: false,
                upperCharAvail: false,
                haveLowercaseLetter: false
            });
        }
    }

    onChangeText = (text) => {
        this.handleInputChange(text);
        this.setComponentState({ newPassword: text });
        if (
            text === this.state.confirmNewPassword &&
            text.length === this.state.confirmNewPassword.length &&
            text.length > 0
        ) {
            return this.setComponentState({ isNewPasswordMatch: true });
        }
        this.setComponentState({ isNewPasswordMatch: false });
    }

    _confirmPassword = (ptext) => {
        this.setComponentState({ confirmNewPassword: ptext });
        if (
            ptext === this.state.newPassword &&
            ptext.length === this.state.newPassword.length &&
            ptext.length > 0
        ) {
            return this.setComponentState({ isNewPasswordMatch: true });
        }
        this.setComponentState({ isNewPasswordMatch: false });
    }

    navigateToForgotPassword = () => {
        const email = this.props.route.params.email;
        this.props.navigation.navigate('ForgotPassword', { email })
    }

    onBackPress = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };

    checkChangePasswordAllowed = () => {
        const {
            currentPassword,
            newPassword,
            isNewPasswordMatch,
            confirmNewPassword,
            eightCharsAvail,
            upperCharAvail,
            haveLowercaseLetter,
            numCharAvail,
            splCharAvail,
        } = this.state;
        if (currentPassword && newPassword && confirmNewPassword && eightCharsAvail && upperCharAvail 
            && haveLowercaseLetter && numCharAvail && splCharAvail && isNewPasswordMatch) {
            return false
        }
        return true;
    }

    render() {
        const {
            currentPassword,
            currentPasswordError,
            newPassword,
            isNewPasswordMatch,
            confirmNewPassword,
            eightCharsAvail,
            upperCharAvail,
            haveLowercaseLetter,
            numCharAvail,
            splCharAvail,
            showProgress,
        } = this.state;
    
        return (
            <ChangePasswordComponent
                headerProps={{
                    onPressLeftContent: this.onBackPress ,
                    isBackVisible: true,
                    isCenterDisabled: true,
                    leftText: 'Change Password',
                }}
                state={{
                    confirmsMinLength: eightCharsAvail,
                    haveUppercaseLetter: upperCharAvail,
                    haveLowercaseLetter: haveLowercaseLetter,
                    haveNumber: numCharAvail,
                    haveSpecialCharacter: splCharAvail
                }}
                atleastEightCharText={'At least 8 characters'}
                oneUpperLetterText={'1 uppercase and 1 lowercase letter'}
                oneNumberText={'1 number'}
                oneSpecialCharText={'1 special character'}
                currentPassword={currentPassword}
                currentPasswordError={currentPasswordError}
                newPassword={newPassword}
                newPasswordError={currentPasswordError}
                confirmNewPassword={confirmNewPassword}
                confirmNewPasswordError={currentPasswordError}
                isNewPasswordMatch={isNewPasswordMatch}
                currentPwdChangeHandler={value => this.setState({ currentPassword: value, currentPasswordError: '' })}
                newPwdChangeHandler={this.onChangeText}
                confirmNewPwdChangeHandler={this._confirmPassword}
                onChangePassword={this.resetPassword}
                isChangePasswordAllowed={this.checkChangePasswordAllowed()}
                isLoading={showProgress}
                pwdChngSucceessTitle={'Password Changed'}
                pwdChngSucceessMessage={'Your password has been successfully changed.'}
                pwdChangeModalBtnText={'OK'}
                forgorPasswordPress={this.navigateToForgotPassword}
                currentPasswordHeaderText={'Current Password'}
                enterPasswordText={'Enter Password'}
                forgotPasswordText={'Forgot Password?'}
                newPasswordHeaderText={'New Password'}
                confirmNewPasswordHeaderText={'Confirm New Password'}
                submitButton={'Submit'}
            />
        );
    }
}

export default ChangePassword;
