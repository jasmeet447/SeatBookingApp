import React, {Component} from 'react';
import {
  Easing,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableHighlightBase,
  Button
} from 'react-native';
import SeatSelectionComponent from '../Components/SeatSelectionComponent';
import { Spinner } from '@pentair/spinner';
import { BoxButton } from '@pentair/box-button';
import { colors, fontWeights } from '@pentair/shared';
import { Header } from '@pentair-ui/mobile';
import { HeadingBodyText } from '@pentair/heading-body-text';
import { a } from 'aws-amplify';
const {width, height} = Dimensions.get('window');
const TotalSeats = 14
const COLS = 6;
export default class SeatSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [],
      toggleForRefresh: true,
      isLoading: false,
      bookedSeatsData: []
    };

    this.selectedSpace = 5;
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
            bookedSeatsData: data.Items,
            toggleForRefresh: !this.state.toggleForRefresh,
            isLoading: false,
            selectedItems: []
          })
        }
        console.log('seats data ---------- ', this.state.bookedSeatsData.filter(i => i.seatNo == 3), this.state.isLoading)
      } catch (error) {
        this.setState({isLoading: false})
        console.error(error)
      } 
    };

  onSelectItem = (item, isSelected) => {
    this.setState({selectedItems: isSelected ? [item.key] : []}, () => {
      console.log('item selected ------- ' , this.state.selectedItems)
    })
  }

  onBookSeat = async (spaceId, SeatNo) => {
    if (spaceId == null || seatNo == null) return
    this.setState({isLoading: true})
    const {selectedItems} = this.state
    if (selectedItems.length <= 0) return
    const seatNo = selectedItems[0] + 1
    const email = this.props?.route?.params?.email
    const userName = this.props?.route?.params?.user?.username
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
          dd = '0' + dd;
        }
    if (mm < 10) {
          mm = '0' + mm;
      }
    const bookingDate = dd + '-' + mm + '-' + yyyy;

      const body = { "spaceNo": this.selectedSpace, "seatNo": seatNo, "bookingByEmail": email ? email :  "", "bookingDate": bookingDate, "userid": userName ? userName : "" }
      console.log('Book seats data begin ---------- ')
      const options = {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(body)
      }
    try {
      const res = await fetch(
        `https://u2nuk3lonl.execute-api.us-east-1.amazonaws.com/sandbox/seatbook/setseats`
      , options)
      if (res) {
        this.fetchSeatsData()
      }
      console.log('seats data Book ---------- ', JSON.stringify(res))
    } catch (error) {
      this.setState({isLoading: false})
      console.error(error)
    } 
  }

  onBackPress = () => {
        const { navigation, user, email } = this.props;
        navigation.goBack();
    };

  render() {
    const seatNumberText = this.state.selectedItems.length > 0 ? `Seat number selected: ${this.state.selectedItems[0] + 1}` : ''
    if (TotalSeats <= 0) {
      return <View />
    }
    return (
      <Animated.View style={styles.container}>
      
      <Header
            headerProps={{
            onPressLeftContent: this.onBackPress ,
            isBackVisible: true,
            isCenterDisabled: true,
            isRightDisabled: false,
            leftText: `Space ${this.selectedSpace}`,
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
            headingText={"Select a seat"}
            bodyText={""}
      />
      <View style={{flex: 0.05}} />
      <SeatSelectionComponent
        // innerRef={this.SeatSelectionRef}
        bookedSeatsData={this.state.bookedSeatsData}
        totalSeatsCount={TotalSeats}
        ColumnsCount={COLS}
        selectedItems={[this.state.selectedItems]}
        onSelectItem={(item, isSelected) => this.onSelectItem(item, isSelected)}
        onPressRefresh={this.state.toggleForRefresh}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '10%',
            width: '100%'
          }}>
        <BoxButton
          buttonStyle={{alignSelf: 'center', padding: 5, width: '100%'}}
          maxWidth={width}
          width={"100%"}
          color={"primary"}
          size={"md"}
          variant={"solid"}
          buttonText={'Book Seat'}
          isDisabled={this.state.selectedItems.length <= 0}
          onPress={this.onBookSeat}
        />  
        <Text style={styles.text}> {seatNumberText} </Text> 
        </View>
        { 
        this.state.isLoading && 
        <View style={{backgroundColor: 'black', position: 'absolute', width, height, opacity: .5}}>
          <Spinner color={colors.INDICATOR_COLOR}/> 
        </View>
        }
        
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 50,
    backgroundColor: 'white',
    padding: 10
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
  text: {fontSize: 15, fontWeight: '500', marginVertical: 10},
  headingTextStyle: {
      fontWeight: fontWeights.FONT_WEIGHT_SEMIBOLD,
      textAlign: 'left',
      top: 10   ,
    },
});
