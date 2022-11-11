import { StyleSheet } from "react-native";
import { colors, fontWeights, normalize } from '@pentair/shared';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    color: 'white',
    fontWeight: '700',
  },
  text: { 
    fontSize: 15, 
    fontWeight: '500', 
    marginVertical: 10 
  },
  headerTextStyle: {
    fontWeight: fontWeights.FONT_WEIGHT_BOLD,
    fontSize: normalize(16),
  },
  seatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: normalize(5),
  },
  spaceNumber: {
    fontSize: normalize(12),
    minWidth: normalize(60)
  },
  seatStyle: {
    width: normalize(25),
    height: normalize(25),
    margin: normalize(5),
    borderWidth: normalize(0.5),
    borderColor: 'green',
    borderRadius: normalize(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatNo: {
    fontSize: normalize(10),
    color: 'green'
  },
  cabinArea: {
    height: normalize(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: normalize(0.5),
    margin: normalize(10),
    borderRadius: normalize(2.5),
    borderColor: colors.WARNING_RED
  },
  cabinAreaText: {
    fontSize: normalize(10),
    color: colors.WARNING_RED
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '10%',
    width: '100%',
    marginBottom: normalize(25),
  },
  buttonStyle: { 
    alignSelf: 'center', 
    padding: normalize(5), 
    width: '100%' 
  },
  seatingPlanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: normalize(5),
    marginVertical: normalize(10)
  },
  seatingPlanText: {
    marginTop: normalize(-5),
  },
  seatRepresentationBlock: {
    flexDirection: 'row',
    marginTop: normalize(20),
  },
  seatRepresentationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: normalize(10),
  },
  bookedSeat: {
    width: normalize(25),
    height: normalize(25),
    borderWidth: normalize(0.5),
    borderRadius: normalize(2.5),
    backgroundColor: colors.DISABLE_BUTTON_COLOR,
    borderColor: colors.DISABLE_BUTTON_COLOR,
  },
  availableSeat: {
    width: normalize(25),
    height: normalize(25),
    borderWidth: normalize(0.5),
    borderRadius: normalize(2.5),
    borderColor: 'green',
  },
  selectedSeat: {
    width: normalize(25),
    height: normalize(25),
    borderWidth: normalize(0.5),
    borderRadius: normalize(2.5),
    backgroundColor: 'green',
    borderColor: 'green',
  },
  seatRepresentationText: {
    marginLeft: normalize(10)
  },
  imageStyle: {
    width: '100%', 
    height: '60%', 
    resizeMode: 'center'
  }
});

export default styles;