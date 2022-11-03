import { Header } from '@pentair-ui/mobile/lib/commonjs/components/Header';
import { Stack } from '@pentair-ui/mobile/lib/commonjs/components/Stack';
import React, {Component} from 'react';
import { Dimensions, View } from 'react-native';
import SpaceSelectionComponent from '../Components/SpaceSelectionComponent';
import {SpaceSelectionContainerStyles as styles} from '../Styles/SpaceSelectionContainerStyles'
import { HeadingBodyText } from '@pentair/heading-body-text';
import { Spinner } from '@pentair/spinner';
import { colors } from '@pentair/shared';
const {width, height} = Dimensions.get('window');

export default class SpaceSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      bookedItems: []
    };
  }

  
    componentDidMount() {
    this.onPressRefresh()
    }

    onPressRefresh = () => {
        this.setState({isLoading: true})
        this.fetchSeatsData()
    };

    fetchSeatsData = async () => {
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }

      let data = null
      try {
        const res = await fetch(
          `https://u2nuk3lonl.execute-api.us-east-1.amazonaws.com/sandbox/seatbook/getseats`
        , options)
        data = await res.json();
        if (data && data.Items) {
          this.setState({
            bookedItems: data.Items,
            toggleForRefresh: !this.state.toggleForRefresh,
            isLoading: false,
            selectedItems: []
          })
        }
      } catch (error) {
        this.setState({isLoading: false})
        console.error(error)
      } 
    };

    onBackPress = () => {
        const { navigation, user, email } = this.props;
        navigation.goBack();
    };

  render() {

    return(
    <View style={styles.container}>
        <Header
            headerProps={{
            onPressLeftContent: this.onBackPress ,
            isBackVisible: true,
            isCenterDisabled: true,
            isRightDisabled: false,
            leftText: 'Space Selection',
            rightText: 'refresh',
            onPressRightContent: this.onPressRefresh,
            rightContent: [{
                iconType: 'general',
                icon: 'refresh',
                size: 22
                }]
            }}
        />

        <View style={{flex: 0.02}} />

        <HeadingBodyText
              headingTextType={'large-header'}
              headingTextStyle={styles.headingTextStyle}
              headingText={"Select a space to book Seats"}
              bodyText={""}
        />

        <View style={{flex: 0.05}} />

        <Stack style={styles.rowContainer}>
            <SpaceSelectionComponent
                horizontalSpaceIds={[6,5,4]}
                verticalSpaceIds={[7,8]}
                containerStyle={{flex: 0.4}}
            />
            <View style={{flex: 0.02}} />
            <SpaceSelectionComponent
                horizontalSpaceIds={[1,2,3]}
                verticalSpaceIds={[9,10]}
                containerStyle={{flex: 0.4}}
                />
            <View style={{flex: 0.05}} />
        </Stack>
        { 
        this.state.isLoading && 
        <View style={{backgroundColor: 'black', position: 'absolute', width, height, opacity: .5}}>
          <Spinner color={colors.INDICATOR_COLOR}/> 
        </View>
        }
    </View>
    )
  }
}