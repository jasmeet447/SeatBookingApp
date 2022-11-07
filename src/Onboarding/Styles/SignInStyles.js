import { StyleSheet, Dimensions } from 'react-native';
import { normalize, fontWeights, SCREEN_WIDTH, colors } from '@pentair/shared'
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    bodyContainer: {
      flex: 1,
      margin: normalize(20),
    },
    headingTextStyle: {
      fontWeight: fontWeights.FONT_WEIGHT_SEMIBOLD
    },
    subTitleText: {
      marginVertical: normalize(10),
    },
    passwordField: {
      marginTop: normalize(20),
    },
    forgotPassword: {
      alignSelf: 'flex-start',
      marginTop: normalize(10),
      fontSize: normalize(13),
      fontWeight:'bold'
    },
    buttonContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: normalize(30),
      width: screenWidth - normalize(40),
    },
    buttonStyle: {
      width: screenWidth - normalize(40),
      alignSelf: 'center'
    },
    spinnerContainer: {
      ...StyleSheet.absoluteFill,
      backgroundColor: colors.TRANSLUCENT_BLACK,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

  export default styles;