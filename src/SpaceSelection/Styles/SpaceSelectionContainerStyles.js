import { colors, fontWeights, normalize } from "@pentair/shared";
import { StyleSheet } from "react-native";

export const SpaceSelectionContainerStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: colors.WHITE_COLOR,
        flexDirection: 'column',
        marginTop: 0,
        justifyContent: 'flex-start',
        // backgroundColor: '#8EF0E7'

    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
   },
    headingTextStyle: {
      fontWeight: fontWeights.FONT_WEIGHT_SEMIBOLD,
      textAlign: 'center',
      top: 10   ,
    },
    subTitleText: {
      marginVertical: normalize(10),
    },
})