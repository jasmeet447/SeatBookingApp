import { StyleSheet } from 'react-native';
import { normalize, SCREEN_WIDTH, colors, fontWeights} from '@pentair/shared';
const screenWidth = SCREEN_WIDTH;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    bodyContainer: {
      flex: 1,
      marginHorizontal: normalize(20),
    },
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
    buttonContainerStyle: {
      marginTop: normalize(25),
    },
    buttonStyle: {
      alignSelf: 'center',
      width: screenWidth - normalize(30),
    },
    headingTextStyle: {
      fontWeight: fontWeights.FONT_WEIGHT_SEMIBOLD
    },
    modalContentTitleTextStyle: {
      fontWeight: fontWeights.FONT_WEIGHT_SEMIBOLD,
      fontSize: normalize(16)
    },
    modalContentBodyTextStyle: {
      fontWeight: fontWeights.FONT_WEIGHT_REGULAR,
      fontSize: normalize(16)
    },
    bodyTextStyle: {
      marginTop: normalize(10),
    },
    headingTextStyle: {
      fontWeight: fontWeights.FONT_WEIGHT_SEMIBOLD,
    },
    codeInputContainerStyle: {
      width: screenWidth,
      maxHeight: normalize(100),
      alignSelf: 'center',
      marginVertical:normalize(20)
    },
  });

  export default styles;