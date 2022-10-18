import { StyleSheet, Dimensions } from 'react-native';
import { normalize, fontWeights } from '@pentair/shared';
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
    buttonContainer: {
      width: screenWidth - normalize(40),
      position: 'absolute',
      bottom: normalize(30),
      alignSelf: 'center'
    },
    absolute: {
      position: "absolute",
      top: 0, left: 0, bottom: 0, right: 0,
  },
  });

  export default styles;