import React from 'react';
import { Stack, Text, Image } from '@pentair-ui/mobile';
import Images from '../../Common_Feature/Images';
import styles from '../Styles/SplashStyles'

class SplashComponent extends React.Component {

  render() {
    return (
        <Stack style={styles.container}>
          <Image style={styles.appIconStyle}source={Images.appIcon} />
          <Text style={styles.loadingTextStyle}>Loading....</Text>
        </Stack>
    );
  }
}

export default SplashComponent;