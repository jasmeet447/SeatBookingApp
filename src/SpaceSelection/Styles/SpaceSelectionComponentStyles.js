import { Dimensions, StyleSheet } from "react-native";
const {width, height} = Dimensions.get('window');

export const SpaceSelectionComponentStyles = StyleSheet.create({
   container: {
    flexDirection: 'row',
    height: height * 0.15,
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    // backgroundColor: '#8EF0E7'
   },
   verticalCardsContainer: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'

   },
   horizontalCardsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
   },
   itemText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center'
  },
  text: {fontSize: 15, fontWeight: '500'},
  TEXT_HEIGHT: 20,
  selectedColor: '#8EF0E7',
  unSelectedColor: '#3493FF',
  alreadyBookedColor: 'gray',
  transparent: 'transparent',
  verticalCards: {
    backgroundColor: '#3493FF',
    flex: 1,
  },
  horizontalCards: {
    backgroundColor: '#3493FF',
    height: '80%',
    width: '32%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 20,
    borderWidth: 1,
  }
})