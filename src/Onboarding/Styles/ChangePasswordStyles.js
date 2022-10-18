import {StyleSheet} from 'react-native';
import {normalize, SCREEN_WIDTH} from '@pentair/shared';
const screenWidth = SCREEN_WIDTH;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    width: '90%',
    margin: normalize(15),
    marginTop: normalize(20),
  },
  inputLabelMargin: {
    marginBottom: normalize(10),
  },
  forgotPwd: {
    fontWeight: 'bold',
    marginTop: normalize(5),
    alignSelf: 'flex-start',
  },
  inputContainer: {
    marginTop: normalize(10),
  },
  submitBtn: {
    width: '100%',
    marginTop:normalize(40)
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  pwdCheckParent:{
    marginVertical: 0
  },
  buttonContainer: {
    width: screenWidth - normalize(40),
    position: 'absolute',
    bottom: normalize(30),
    alignSelf: 'center'
  },
});

export default styles;
