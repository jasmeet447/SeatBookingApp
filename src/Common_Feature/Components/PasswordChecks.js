import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { colors, normalize } from '@pentair/shared';
import { Box, Stack, Image, Text } from '@pentair-ui/mobile';

export const PasswordChecks = ({...props }) => {
    const { state } = props;

    const StatusChecks = ({ passed, text }) => {
        return (
            <Stack style={styles.status}>
                <Image style={passed && styles.tintPassed} source={props.checkGrey} />
                <Text style={[styles.statusText, passed && styles.statusPassed]}>
                    {text}
                </Text>
            </Stack>
        );
    };

    const component = () => (
        <Box style={[styles.passwordChecks, props?.parentStyle]}>
            <StatusChecks
                passed={state.confirmsMinLength}
                text={props.atleastEightCharText}
            />
            <StatusChecks
                passed={
                    state.haveUppercaseLetter && state.haveLowercaseLetter
                }
                text={props.oneUpperLetterText}
            />
            <StatusChecks
                passed={state.haveNumber}
                text={props.oneNumberText}
            />
            <StatusChecks
                passed={state.haveSpecialCharacter}
                text={props.oneSpecialCharText}
            />
        </Box>
    );

    return (
        useMemo(component, [
            state.confirmsMinLength,
            state.haveUppercaseLetter,
            state.haveLowercaseLetter,
            state.haveNumber,
            state.haveSpecialCharacter
        ])
    );
};

const styles = StyleSheet.create({
    passwordChecks: {
      marginVertical: normalize(20),
    },
    status: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: normalize(2),
    },
    tintPassed: {
      tintColor: colors.SUCCESS,
    },
    statusText: {
      marginLeft: normalize(7),
      marginVertical: normalize(4),
      fontSize: normalize(14),
      color: colors.LIGHT_GREY,
    },
    statusPassed: {
      color: colors.DARK1_GREY,
    },
    headingTextStyle: {
      fontWeight: '600'
    },
  });

