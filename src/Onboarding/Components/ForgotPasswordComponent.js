import React from 'react';
import { Platform } from "react-native";
import { Header, Stack, Input, Box } from '@pentair-ui/mobile';
import { BoxButton } from '@pentair/box-button';
import { HeadingBodyText } from '@pentair/heading-body-text';
import { colors } from '@pentair/shared';
import { Spinner } from '@pentair/spinner';

const ForgotPasswordComponent = (props) => {

    return (
        <Stack style={props.containerStyle}>
            <Header headerProps={props.headerProps} />
            <Stack style={props.subContainerStyle}>
                <HeadingBodyText
                    headingTextType={props.headingTextType}
                    headingTextStyle={props.headingTextStyle}
                    bodyTextStyle={props.bodyTextStyle}
                    headingText={props.headingText}
                    bodyText={props.bodyText} />
                <Box removeClippedSubviews={Platform.OS == 'ios' ? false : true}>
                    <Input
                        contextMenuHidden={true}
                        autoCorrect={false}
                        labelStyles={props.labelStyles}
                        placeholder={props.placeholder}
                        label={props.label}
                        value={props.inputValue}
                        isInvalid={props.isInvalid}
                        errorMsg={props.errorMsg}
                        onChangeText={props.inputOnChangeText} />
                </Box>
                <BoxButton
                    buttonStyle={props.buttonStyle}
                    maxWidth={props.buttonStyle.width}
                    width={props.buttonWidth}
                    color={props.buttonColor}
                    size={props.buttonSize}
                    variant={props.buttonVariant}
                    onPress={props.buttonOnPress}
                    buttonText={props.buttonText}
                    isDisabled={props?.isButtonDisable} />
            </Stack>
            {props.spinnerIndicator ? <Spinner color={colors.INDICATOR_COLOR} /> : null}
        </Stack>
    );
};

export default ForgotPasswordComponent;
