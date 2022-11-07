import { StyleSheet } from 'react-native';
import { normalize, SCREEN_WIDTH } from '@pentair/shared';
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255, 255, 255)'
    },
    appIconStyle: {
        width: normalize(100),
        height: normalize(100)
    },
    loadingTextStyle: {
        marginTop: normalize(-20)
    }
});

export default styles;
