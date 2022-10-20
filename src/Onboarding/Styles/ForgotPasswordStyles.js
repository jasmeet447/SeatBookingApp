import { StyleSheet, Dimensions } from 'react-native';
import { colors, fontWeights, normalize } from '@pentair/shared';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.WHITE_COLOR,
      borderRadius: normalize(12),
    },
    forgotPContainer: {
      flex: 1,
      marginHorizontal: normalize(20),
    },
    labelStyle: {
      marginTop: normalize(10)
    },
    headingTextStyle: {
      fontWeight:fontWeights.FONT_WEIGHT_SEMIBOLD
    },
    buttonContainer: {
      position: 'absolute',
      bottom: normalize(30),
      alignSelf: 'center',
      width: screenWidth - normalize(40),
    }
  });

export default styles;