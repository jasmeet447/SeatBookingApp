import React from 'react';
import { Platform} from 'react-native'
import { Stack, Header, Text, Input, Box } from '@pentair-ui/mobile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Spinner } from '@pentair/spinner';
import { BoxButton } from '@pentair/box-button';
import { HeadingBodyText } from '@pentair/heading-body-text';
import styles from '../Styles/SignInStyles';

class SignInComponent extends React.Component {

  renderButtons = () => {
    const { onSignInPress, isFormEmpty, buttonText, switchAccountText, goToBack } = this.props;
    return (
    <Stack
      style={styles.buttonContainer}>
      <BoxButton
        buttonStyle={styles.buttonStyle}
        maxWidth={styles.buttonStyle.width}
        width={"100%"}
        color={"primary"}
        size={"md"}
        variant={"solid"}
        buttonText={buttonText}
        isDisabled={isFormEmpty()}
        onPress={onSignInPress} />
    </Stack>
    );
  };

  renderFields = () => {
    const { state, onChangeText, onSignInPress, navigateToForgotPassword, input1Label, 
      input1Placeholder, forgotPasswordText, input2Label, input2Placeholder } = this.props;
    return (
      <KeyboardAwareScrollView
        behavior="`padding`">
        <Input
          label={input1Label}
          placeholder={input1Placeholder}
          returnKeyType="next"
          value={state.email}
          onChangeText={onChangeText('email')} />
        <Box removeClippedSubviews={Platform.OS == 'ios' ? false : true}>
          <Input
            contextMenuHidden={true}
            autoCorrect={false}
            label={input2Label}
            placeholder={input2Placeholder}
            isPasswordInput={true}
            isRightIconVisible={true}
            value={state.password}
            onChangeText={onChangeText('password')}
            returnKeyType="done"
            onSubmitEditing={onSignInPress}
            labelStyles={styles.passwordField}
            errorMsg={state.error} />
          <Text 
            style={styles.forgotPassword} 
            type="small-link" 
            onPress={navigateToForgotPassword}>
          {forgotPasswordText}
          </Text>
        </Box>
      </KeyboardAwareScrollView>
    );
  };

  render() {
    const { headingText, bodyText, state, headerProps } = this.props;
    return (
      <>
        <Stack style={styles.container}>
          <Header headerProps={headerProps} />
          <Stack style={styles.bodyContainer}>
            <HeadingBodyText
              headingTextType={'large-header'}
              headingTextStyle={styles.headingTextStyle}
              headingText={headingText}
              bodyText={bodyText} 
              bodyTextStyle={styles.subTitleText}/>
            {this.renderFields()}
            {this.renderButtons()}
          </Stack>
        </Stack>
        {state.isLoading && <Spinner />}
      </>
    );
  }
}

export default SignInComponent;