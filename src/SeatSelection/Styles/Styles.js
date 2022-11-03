import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
  },
  item: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  itemText: {
    color: 'white',
    fontWeight: '700',
  },
  text: {fontSize: 15, fontWeight: '500'},
  TIMING: 500,
  TEXT_HEIGHT: 20,
  selectedColor: '#8EF0E7',
  unSelectedColor: '#3493FF',
  alreadyBookedColor: 'gray',
  transparent: 'transparent'
});