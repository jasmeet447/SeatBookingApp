import React from 'react';
import { Platform } from "react-native";
import { Spinner } from '@pentair/spinner';
import { Stack, Input, Box, Header } from '@pentair-ui/mobile';
import { BoxButton } from '@pentair/box-button';
import styles from '../Styles/WelcomeStyles';
import { HeadingBodyText } from '@pentair/heading-body-text';

const WelcomeComponent = ({ ...props }) => {

  return (
    <>
      <Stack style={styles.container}>
        <Header headerProps={props.headerProps}/>
        <Stack style={styles.bodyContainer}>
          <HeadingBodyText
            headingTextType={'large-header'}
            headingTextStyle={styles.headingTextStyle}
            headingText={props.headingText}
            bodyText={props.bodyText}
            bodyTextStyle={styles.subTitleText} />
          <Box removeClippedSubviews={Platform.OS == 'ios' ? false : true}>
            <Input
              contextMenuHidden={true}
              autoCorrect={false}
              placeholder={props.placeholder}
              inputStyles={{ alignSelf: 'center' }}
              label={props.label}
              value={props.emailAddress}
              onChangeText={props.onChangeText}
              errorMsg={props.error}
              onSubmitEditing={props.onFindMyInfoPress}
            />
          </Box>
          <BoxButton
            buttonStyle={styles.buttonContainer}
            maxWidth={styles.buttonContainer.width}
            width={"100%"}
            color={"primary"}
            size={"md"}
            variant={"solid"}
            onPress={props.onFindMyInfoPress}
            buttonText={props.buttonText}
            isDisabled={props?.isButtonDisable} />
        </Stack>
      </Stack>
      {props.isLoading && <Spinner />}
    </>
  );
};

export default WelcomeComponent;