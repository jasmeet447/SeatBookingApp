import React from 'react';
import { Platform, View } from 'react-native'
import {
  Header,
  Stack,
  Box,
  Text,
  Input,
} from '@pentair-ui/mobile';
import { PasswordChecks } from '../../Common_Feature/Components/PasswordChecks';
import Images from '../../Common_Feature/Images';
import styles from '../Styles/ChangePasswordStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BoxButton } from '@pentair/box-button';
import { Spinner } from '@pentair/spinner';

const ChangePwdContainer = props => {

  return (
    <>
      <Header
        headerProps={props?.headerProps} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <Stack style={styles.rootContainer}>
          <Box removeClippedSubviews={Platform.OS == 'ios' ? false : true}>
            <Input
              contextMenuHidden={true}
              autoCorrect={false}
              label={props.currentPasswordHeaderText}
              value={props.currentPassword}
              placeholder={props.enterPasswordText}
              onChangeText={props.currentPwdChangeHandler}
              errorMsg={props.currentPasswordError}
              isInvalid={props.currentPasswordError.length > 0}
              labelStyles={styles.inputLabelMargin}
              isPasswordInput={true}
              isRightIconVisible={true}
              returnKeyType="done"
              maxLength={25}
            />
          </Box>
          <Text type="small-link" style={styles.forgotPwd} onPress={props.forgorPasswordPress}>
            {props.forgotPasswordText}
          </Text>

          <Stack style={styles.inputContainer}>
            <Box removeClippedSubviews={Platform.OS == 'ios' ? false : true}>
              <Input
                contextMenuHidden={true}
                autoCorrect={false}
                label={props.newPasswordHeaderText}
                value={props.newPassword}
                onChangeText={props.newPwdChangeHandler}
                placeholder={props.enterPasswordText}
                labelStyles={styles.inputLabelMargin}
                isPasswordInput={true}
                isRightIconVisible={true}
                returnKeyType="done"
                maxLength={25}
              />
            </Box>
            <PasswordChecks
              state={{
                confirmsMinLength: false,
                haveUppercaseLetter: false,
                haveLowercaseLetter: false,
                haveNumber: false,
                haveSpecialCharacter: false,
              }}
              {...props}
              checkGrey={Images.checkGrey}
              parentStyle={styles.pwdCheckParent}
            />
          </Stack>

          <Stack
            style={styles.inputContainer}
            removeClippedSubviews={Platform.OS == 'ios' ? false : true}>
            <Input
              contextMenuHidden={true}
              autoCorrect={false}
              label={props.confirmNewPasswordHeaderText}
              value={props.confirmNewPassword}
              onChangeText={props.confirmNewPwdChangeHandler}
              placeholder={props.enterPasswordText}
              labelStyles={styles.inputLabelMargin}
              isPasswordInput={true}
              isSuccess={props.isNewPasswordMatch}
              isRightIconVisible={true}
              returnKeyType="done"
              maxLength={25}
            />
          </Stack>
          <BoxButton
            buttonStyle={styles.buttonContainer}
            maxWidth={styles.buttonContainer.width}
            buttonText={props.submitButton}
            isDisabled={props.isChangePasswordAllowed}
            onPress={props.onChangePassword} />
        </Stack>
      </KeyboardAwareScrollView>
      {props.isLoading && <Spinner />}
    </>
  );
};

export default ChangePwdContainer;
