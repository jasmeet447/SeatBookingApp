import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Alert } from 'react-native';
import { getAuthErrorMessage } from '../../Helper';
import { VALIDATION_REGX } from '../../Globals/Strings';
import styles from '../Styles/ForgotPasswordStyles';
import ForgotPasswordComponent from '../Components/ForgotPasswordComponent';

const ForgotPassword = ({navigation, route}) => {
    const [emailAddress, setEmailAddress] = useState(route.params.email);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setLoading] = useState(false);

    const onChangeText = text => {
        setEmailAddress(text)
        setErrorMessage('')
    }

    const onSubmit = async () => {
        const reg = new RegExp(VALIDATION_REGX.email)
        if (emailAddress && reg.test(emailAddress) === true) {
            const navEmail = emailAddress.toLocaleLowerCase();
            try {
                setLoading(true);
                const forgotPasswordResponse = await Auth.forgotPassword(navEmail);
                if (forgotPasswordResponse && forgotPasswordResponse !== null) {
                    navigation.navigate('ResetPassword', {
                        email: navEmail
                    });
                }
                setLoading(false);
            } catch (forgotPasswordError) {
                if (forgotPasswordError && forgotPasswordError != null) {
                    setTimeout(()=>{
                        Alert.alert('Error', getAuthErrorMessage(forgotPasswordError?.code));
                    }, 10)
                }
                setLoading(false);
            }
        } else {
            setErrorMessage('Please enter a valid email');
        }
    }

    return (
        <ForgotPasswordComponent
            containerStyle={styles.container}
            headerProps={{
                onPressLeftContent: () => navigation.goBack(),
                isBackVisible: true,
                isCenterDisabled: true,
                leftText: 'Sign In'
            }}
            subContainerStyle={styles.forgotPContainer}
            headingTextType={'large-header'} 
            bodyTextStyle={styles.labelStyle}
            headingText={'Forgot Password'}
            headingTextStyle={styles.headingTextStyle}
            bodyText={"No worries. We'll send 6-digit verification code to your email to reset your password."}
            inputType={'email'}
            labelStyles={styles.labelStyle}
            placeholder={'Email'}
            label={'Email Address'}
            inputValue={emailAddress}
            inputOnChangeText={onChangeText}
            buttonStyle={styles.buttonContainer}
            buttonWidth={"100%"}
            buttonColor={"primary"}
            buttonSize={"md"}
            buttonVariant={"solid"}
            buttonOnPress={onSubmit}
            buttonText={'Reset'}
            spinnerIndicator={isLoading}
            spinnerStyle={styles.spinner}
            isButtonDisable={!String(emailAddress).trim()}
            buttonSubmitText={'Submit'}
            errorMsg={errorMessage}
            isInvalid={errorMessage?.length > 0}
        />
    );
};

export default ForgotPassword;