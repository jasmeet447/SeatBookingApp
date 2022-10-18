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
            isPasswordConfirmed: false,
            strength: '',
            splCharAvail: false,
            numCharAvail: false,
            eightCharsAvail: false,
            upperCharAvail: false,
            showProgress: false,
            showPassword: true,
            showCurrentPassword: true,
            viewRef: null,
            showModal: false,
            showForgotModalStatus: false,
            forgotIndicator: false,
            forgetEmail: '',
            invalidResetEmail: false,
            isNewPasswordMatch: false,
            newPassword: '',
            confirmNewPassword: "",
            haveLowercaseLetter: false,
            showErrorModel: false,
        };
        this.passwordVal = '';
        this.resetPassword.bind(this);
    }

    setComponentState = (obj = {}, callback) => {
        this.setState(obj, callback);
    };

    _resetPasswordSuccess = () => {
        this.setComponentState({ showProgress: false });
    };

    onErrorOkClick = () => {
        this.setState({ showErrorModel: false })
    }

    resetPassword = () => {
        const forcePasswordReset = this.props.navigation.getParam(
            'forcePasswordReset',
            false,
        );
        const email = this.props.navigation.getParam('email', '');

        if (forcePasswordReset) {
            this.setComponentState({ showProgress: true });

            Auth.signIn(email, this.state.currentPassword)
                .then(user => Auth.completeNewPassword(user, this.state.newPassword, {}))
                .catch((err) => {
                    this.handleError(err);
                });
        } else {
            this.setComponentState({ showProgress: true });

            Auth.currentAuthenticatedUser()
                .then(user =>
                    Auth.changePassword(
                        user,
                        this.state.currentPassword,
                        this.state.newPassword,
                    ),
                )
                .catch((err) => {
                    this.handleError(err);
                });
        }
    };

    handleError = (err) => {
        if (err?.code === 'NotAuthorizedException') {
            this.setComponentState({
                currentPasswordError: 'The password is incorrect.',
                showProgress: false,
            });
        }
        else {
            this.setComponentState({
                showProgress: false,
            });
            Alert.alert('Error', getAuthErrorMessage(err?.code));
        }
    }

    handleInputChange(val) {
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

    onChangeText(text) {
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

    _confirmPassword(ptext) {
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
            showModal
        } = this.state;
        const isChangePwsAllowed =
            currentPassword &&
                newPassword &&
                isNewPasswordMatch &&
                splCharAvail &&
                numCharAvail &&
                eightCharsAvail &&
                upperCharAvail &&
                haveLowercaseLetter ? false : true
        return (
            <ChangePasswordComponent
                headerProps={{
                    onPressLeftContent: this.onBackPress ,
                    isBackVisible: true,
                    isCenterDisabled: true,
                    fontWeight: 'bold',
                    leftTextStyle: { fontWeight: 'bold' },
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
                currentPwdChangeHandler={value => {
                    this.setState({ currentPassword: value, currentPasswordError: '' });
                }}
                newPwdChangeHandler={value => this.onChangeText(value)}
                confirmNewPwdChangeHandler={ptext => this._confirmPassword(ptext)}
                onChangePassword={this.resetPassword}
                isChangePwsAllowed={isChangePwsAllowed}
                isLoading={showProgress}
                pwdChngSucceessTitle={'Password Changed'}
                pwdChngSucceessMessage={'Your password has been successfully changed.'}
                pwdChangeModalBtnText={'OK'}
                isPwdChngSucccessModalVisible={showModal}
                forgorPasswordPress={this.navigateToForgotPassword}
                currentPasswordHeaderText={'Current Password'}
                enterPasswordText={'Enter Password'}
                forgotPasswordText={'Forgot Password?'}
                newPasswordHeaderText={'New Password'}
                confirmNewPasswordHeaderText={'Confirm New Password'}
                submitButton={'Submit'}
                showErrorModel={this.state.showErrorModel}
                onErrorOkClick={this.onErrorOkClick}
                errorMessage={this.state.errorMessage}
            />
        );
    }
}

export default ChangePassword;
