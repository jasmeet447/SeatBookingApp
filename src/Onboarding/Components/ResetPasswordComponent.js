import React from 'react';
import { Platform, View} from 'react-native'
import { normalize } from '@pentair/shared';
import Images from '../../Common_Feature/Images'
import { Spinner } from '@pentair/spinner';
import { Header, Stack, Text, Input, Modal, ModalContent, CodeInput } from '@pentair-ui/mobile';
import { BoxButton } from '@pentair/box-button';
import styles from '../Styles/ResetPasswordStyles';
import { PasswordChecks } from '../../Common_Feature/Components/PasswordChecks';
import { HeadingBodyText } from '@pentair/heading-body-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ResetPasswordComponent = ({navigation, ...props}) => {
  const renderPasswordChecks = () => {
    return (
      <PasswordChecks
        state={{
          confirmsMinLength: props.confirmsMinLength,
          haveUppercaseLetter: props.haveUppercaseLetter,
          haveLowercaseLetter: props.haveLowercaseLetter,
          haveNumber: props.haveNumber,
          haveSpecialCharacter: props.haveSpecialCharacter
        }}
        {...props}
        checkGrey={Images.checkGrey} />
    );
  };

  const renderButton = () => (
    <Stack style={styles.buttonContainerStyle}>
      <BoxButton
        buttonStyle={styles.buttonStyle}
        maxWidth={styles.buttonStyle.width}
        width={'100%'}
        color={'primary'}
        size={'md'}
        variant={'solid'}
        onPress={props.resetPassword}
        buttonText={props.buttonText}
        isDisabled={props.isFormEmpty()}
      />
      <BoxButton
        buttonStyle={styles.buttonStyle}
        maxWidth={styles.buttonStyle.width}
        width={'100%'}
        color={'primary'}
        size={'md'}
        variant={'ghost'}
        onPress={props?.onResendCode}
        buttonText={props?.resendButtonText}
      />
    </Stack>
  );

  const renderFields = () => (
    <>
    <View removeClippedSubviews={Platform.OS == 'ios' ? false : true}>
      <Input
        contextMenuHidden={true}
        autoCorrect={false}
        {...props.input1Props}
        isPasswordInput={true}
        isRightIconVisible={true}
        value={props.newPassword}
        onChangeText={props.onChangePassword}
        returnKeyType="next"
        onSubmitEditing={props.focusConfirmPasswordField}
      />
      </View>
      {renderPasswordChecks()}
      <View removeClippedSubviews={Platform.OS == 'ios' ? false : true}>
      <Input
        contextMenuHidden={true}
        autoCorrect={false}
        {...props.input2Props}
        isPasswordInput={true}
        isRightIconVisible={true}
        value={props.confirmNewPassword}
        onChangeText={props.onChangeConfirmPassword}
        isSuccess={props.isSuccess()}
      />
      </View>
    </>
  );

  const showModelAlert = () => {
    return (
      <Modal
        isVisible={props.showModalAlert}
        isCancelOptionVisible={false}>
        <ModalContent
          {...props.modelAlertProps}
          titleTextStyle={styles.modalContentTitleTextStyle}
          bodyTextStyle={styles.modalContentBodyTextStyle}/>
      </Modal>
    );
  }

  return (
    <>
      <Stack style={styles.container}>
        <Header
          headerProps={{
            onPressLeftContent: () => navigation.goBack(),
            isBackVisible: true,
            isCenterDisabled: true,
            leftText: props.leftText
          }}/>
        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={normalize(100)}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
        <Stack style={styles.bodyContainer}>
            <HeadingBodyText
              headingTextType={'large-header'}
              headingTextStyle={styles.headingTextStyle}
              bodyTextStyle={styles.bodyTextStyle}
              headingText={props?.headingText}
              bodyText={props?.bodyText}
            />
            <CodeInput
              containerStyle={styles.codeInputContainerStyle}
              label={props?.label}
              onChangeText={props?.inputOnChangeText}
              value={props?.inputValue}
              isInvalid={props?.isInvalid}
              errorMsg={props?.errorMsg}
            />
          {renderFields()}
          {renderButton()}
        </Stack>
        </KeyboardAwareScrollView>
        <Modal 
          isVisible={props.showModal}
          onModalHide={props.onModalHide}
          isCancelOptionVisible={false}>
          <ModalContent
            type="success" 
            isSecondaryButtonVisible={false}
            {...props.modalContentProps}
            onPressPrimaryButton={props.logout}/>
        </Modal>
        {showModelAlert()}
      </Stack>
      {props.isLoading && <Spinner />}
    </>
  );
}

export default ResetPasswordComponent;