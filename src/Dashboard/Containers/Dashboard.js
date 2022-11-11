import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  requireNativeComponent
} from 'react-native';
import { Spinner } from '@pentair/spinner';
import { BoxButton } from '@pentair/box-button';
import { Stack, Header, Icon, Box, Text, Status, Modal, ModalContent, Image } from '@pentair-ui/mobile';
import { colors } from '@pentair/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Styles/DashboardStyles';
import Images from '../../Common_Feature/Images';
import { NestedScrollView } from '../../Common_Feature/Components/NestedScrollView';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.SPACE_1_TO_6_SEATS = {
      space1: [{
        seatNo: 1,
        spaceNo: 1,
        isBooked: true
      },
      {
        seatNo: 2,
        spaceNo: 1,
        isBooked: true
      },
      {
        seatNo: 3,
        spaceNo: 1,
        isBooked: true
      },
      {
        seatNo: 4,
        spaceNo: 1,
        isBooked: true
      },
      {
        seatNo: 5,
        spaceNo: 1,
        isBooked: true
      },
      {
        seatNo: 6,
        spaceNo: 1,
        isBooked: true
      },
      {
        seatNo: 7,
        spaceNo: 1,
        isBooked: true
      },
      {
        seatNo: 8,
        spaceNo: 1,
        isBooked: true
      },
      {
        seatNo: 9,
        spaceNo: 1,
        isBooked: true
      },
      {
        seatNo: 10,
        spaceNo: 1,
        isBooked: true
      },
      {
        seatNo: 11,
        spaceNo: 1,
        isBooked: true
      },
      {
        seatNo: 12,
        spaceNo: 1,
        isBooked: true
      },
      {
        seatNo: 13,
        spaceNo: 1,
        isBooked: true
      },
      {
        seatNo: 14,
        spaceNo: 1,
        isBooked: true
      }],
      space2: [{
        seatNo: 1,
        spaceNo: 2,
      },
      {
        seatNo: 2,
        spaceNo: 2,
      },
      {
        seatNo: 3,
        spaceNo: 2,
      },
      {
        seatNo: 4,
        spaceNo: 2,
      },
      {
        seatNo: 5,
        spaceNo: 2,
      },
      {
        seatNo: 6,
        spaceNo: 2,
      },
      {
        seatNo: 7,
        spaceNo: 2,
      },
      {
        seatNo: 8,
        spaceNo: 2,
      },
      {
        seatNo: 9,
        spaceNo: 2,
      },
      {
        seatNo: 10,
        spaceNo: 2,
      },
      {
        seatNo: 11,
        spaceNo: 2,
      },
      {
        seatNo: 12,
        spaceNo: 2,
      },
      {
        seatNo: 13,
        spaceNo: 2,
      },
      {
        seatNo: 14,
        spaceNo: 2,
      }],
      space3: [{
        seatNo: 1,
        spaceNo: 3,
      },
      {
        seatNo: 2,
        spaceNo: 3,
      },
      {
        seatNo: 3,
        spaceNo: 3,
      },
      {
        seatNo: 4,
        spaceNo: 3,
      },
      {
        seatNo: 5,
        spaceNo: 3,
      },
      {
        seatNo: 6,
        spaceNo: 3,
      },
      {
        seatNo: 7,
        spaceNo: 3,
      },
      {
        seatNo: 8,
        spaceNo: 3,
      },
      {
        seatNo: 9,
        spaceNo: 3,
      },
      {
        seatNo: 10,
        spaceNo: 3,
      },
      {
        seatNo: 11,
        spaceNo: 3,
      },
      {
        seatNo: 12,
        spaceNo: 3,
      },
      {
        seatNo: 13,
        spaceNo: 3,
      },
      {
        seatNo: 14,
        spaceNo: 3,
      }],
      space4: [{
        seatNo: 1,
        spaceNo: 4,
      },
      {
        seatNo: 2,
        spaceNo: 4,
      },
      {
        seatNo: 3,
        spaceNo: 4,
      },
      {
        seatNo: 4,
        spaceNo: 4,
      },
      {
        seatNo: 5,
        spaceNo: 4,
      },
      {
        seatNo: 6,
        spaceNo: 4,
      },
      {
        seatNo: 7,
        spaceNo: 4,
      },
      {
        seatNo: 8,
        spaceNo: 4,
      },
      {
        seatNo: 9,
        spaceNo: 4,
      },
      {
        seatNo: 10,
        spaceNo: 4,
      },
      {
        seatNo: 11,
        spaceNo: 4,
      },
      {
        seatNo: 12,
        spaceNo: 4,
      },
      {
        seatNo: 13,
        spaceNo: 4,
      },
      {
        seatNo: 14,
        spaceNo: 4,
      }],
      space5: [{
        seatNo: 1,
        spaceNo: 5,
      },
      {
        seatNo: 2,
        spaceNo: 5,
      },
      {
        seatNo: 3,
        spaceNo: 5,
      },
      {
        seatNo: 4,
        spaceNo: 5,
      },
      {
        seatNo: 5,
        spaceNo: 5,
      },
      {
        seatNo: 6,
        spaceNo: 5,
      },
      {
        seatNo: 7,
        spaceNo: 5,
      },
      {
        seatNo: 8,
        spaceNo: 5,
      },
      {
        seatNo: 9,
        spaceNo: 5,
      },
      {
        seatNo: 10,
        spaceNo: 5,
      },
      {
        seatNo: 11,
        spaceNo: 5,
      },
      {
        seatNo: 12,
        spaceNo: 5,
      },
      {
        seatNo: 13,
        spaceNo: 5,
      },
      {
        seatNo: 14,
        spaceNo: 5,
      }],
      space6: [{
        seatNo: 1,
        spaceNo: 6,
      },
      {
        seatNo: 2,
        spaceNo: 6,
      },
      {
        seatNo: 3,
        spaceNo: 6,
      },
      {
        seatNo: 4,
        spaceNo: 6,
      },
      {
        seatNo: 5,
        spaceNo: 6,
      },
      {
        seatNo: 6,
        spaceNo: 6,
      },
      {
        seatNo: 7,
        spaceNo: 6,
      },
      {
        seatNo: 8,
        spaceNo: 6,
      },
      {
        seatNo: 9,
        spaceNo: 6,
      },
      {
        seatNo: 10,
        spaceNo: 6,
      },
      {
        seatNo: 11,
        spaceNo: 6,
      },
      {
        seatNo: 12,
        spaceNo: 6,
      },
      {
        seatNo: 13,
        spaceNo: 6,
      },
      {
        seatNo: 14,
        spaceNo: 6,
      }],
    };
    this.SPACE_7_TO_10_SEATS = {
      space7: [
        {
          seatNo: 1,
          spaceNo: 7,
        },
        {
          seatNo: 2,
          spaceNo: 7,
        },
        {
          seatNo: 3,
          spaceNo: 7,
        },
        {
          seatNo: 4,
          spaceNo: 7,
        },
        {
          seatNo: 5,
          spaceNo: 7,
        },
        {
          seatNo: 6,
          spaceNo: 7,
        },
        {
          seatNo: 7,
          spaceNo: 7,
        },
        {
          seatNo: 8,
          spaceNo: 7,
        },
        {
          seatNo: 9,
          spaceNo: 7,
        },
        {
          seatNo: 10,
          spaceNo: 7,
        }
      ],
      space8: [
        {
          seatNo: 1,
          spaceNo: 8,
        },
        {
          seatNo: 2,
          spaceNo: 8,
        },
        {
          seatNo: 3,
          spaceNo: 8,
        },
        {
          seatNo: 4,
          spaceNo: 8,
        },
        {
          seatNo: 5,
          spaceNo: 8,
        },
        {
          seatNo: 6,
          spaceNo: 8,
        },
        {
          seatNo: 7,
          spaceNo: 8,
        },
        {
          seatNo: 8,
          spaceNo: 8,
        },
        {
          seatNo: 9,
          spaceNo: 8,
        },
        {
          seatNo: 10,
          spaceNo: 8,
        }
      ],
      space9: [
        {
          seatNo: 1,
          spaceNo: 9,
        },
        {
          seatNo: 2,
          spaceNo: 9,
        },
        {
          seatNo: 3,
          spaceNo: 9,
        },
        {
          seatNo: 4,
          spaceNo: 9,
        },
        {
          seatNo: 5,
          spaceNo: 9,
        },
        {
          seatNo: 6,
          spaceNo: 9,
        },
        {
          seatNo: 7,
          spaceNo: 9,
        },
        {
          seatNo: 8,
          spaceNo: 9,
        },
        {
          seatNo: 9,
          spaceNo: 9,
        },
        {
          seatNo: 10,
          spaceNo: 9,
        }
      ],
      space10: [
        {
          seatNo: 1,
          spaceNo: 10,
        },
        {
          seatNo: 2,
          spaceNo: 10,
        },
        {
          seatNo: 3,
          spaceNo: 10,
        },
        {
          seatNo: 4,
          spaceNo: 10,
        },
        {
          seatNo: 5,
          spaceNo: 10,
        },
        {
          seatNo: 6,
          spaceNo: 10,
        },
        {
          seatNo: 7,
          spaceNo: 10,
        },
        {
          seatNo: 8,
          spaceNo: 10,
        },
        {
          seatNo: 9,
          spaceNo: 10,
        },
        {
          seatNo: 10,
          spaceNo: 10,
        }
      ]
    }
    this.state = {
      isLoading: false,
      selectedSpaceNo: -1,
      selectedSpaceCategory: -1,
      selectedSeatIndex: -1,
      selectedSeat: null,
      seatingPlanModal: false
    };
  }

  componentDidMount() {
    this.onPressRefresh()
  }

  onPressRefresh = () => {
    this.setState({ isLoading: true })
    this.fetchSeatsData()
  };

  logout = async () => {
    Alert.alert(
      'Logout!', 
      'Are you sure you wants to logout?',
      [{
        text: 'OK',
        onPress: async () => {
          this.props.navigation.navigate('SignIn');
          await AsyncStorage.clear()
        },
        style: 'default'
      },
      {
        text: 'Cancel',
        style: 'destructive'
      }])
    
  }

  fetchSeatsData = async callback => {
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
        for (let i = 0; i < data.Items.length; i++) {
          let element = data.Items[i];
          let space = `space${element.spaceNo}`
          let index = element.seatNo - 1
          element.isBooked = true;
          element.isSelected = true;
          if (space === 'space7' || space === 'space8' || space === 'space9' || space === 'space10') {
            this.SPACE_7_TO_10_SEATS[space][index] = element;
          } else {
            this.SPACE_1_TO_6_SEATS[space][index] = element;
          }
          if (element.userid === this.props.route.params.user.username) {
            this.isCurrentUserBookedOneseat = true;
          }
        }
        this.setState({
          isLoading: false,
        })
        callback && callback()
      }
    } catch (error) {
      this.setState({ isLoading: false })
      console.error(error)
    }
  };

  onBookSeat = async () => {
    try {
      this.setState({ isLoading: true })
      const { selectedSeat, selectedSpaceNo, selectedSpaceCategory, selectedSeatIndex } = this.state
      const email = this.props.route.params.email;
      const userName = this.props.route.params.user.username;
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

      const body = {
        spaceNo: selectedSeat.spaceNo,
        seatNo: selectedSeat.seatNo,
        bookingByEmail: email,
        bookingDate: bookingDate,
        userid: userName
      }
      const res = await fetch(
        'https://u2nuk3lonl.execute-api.us-east-1.amazonaws.com/sandbox/seatbook/setseats',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
      if (res) {
        this.setState({
          selectedSpaceNo: -1,
          selectedSpaceCategory: -1,
          selectedSeatIndex: -1,
          selectedSeat: null
        });
        this.fetchSeatsData(() => {
          Alert.alert(
            'Seating Plan!',
            `Seat ${selectedSeat.seatNo} booked in space ${selectedSeat.spaceNo}. Do you want to see Seating Plan?`,
            [{
              text: 'OK',
              onPress: async () => {
                this.setState({ seatingPlanModal: true });
              },
              style: 'default'
            },
            {
              text: 'Cancel',
              style: 'destructive'
            }]);
        })
        this.isCurrentUserBookedOneseat = true;
      }
    } catch (error) {
      this.setState({ isLoading: false })
      console.error(error)
    }
  }

  onPressSeat = (item, index, spaceNo) => () => {
    if (!this.isCurrentUserBookedOneseat) {
      item.isSelected = true;
      let spaceCategory;
      if (spaceNo === 'space7' || spaceNo === 'space8' || spaceNo === 'space9' || spaceNo === 'space10') {
        this.SPACE_7_TO_10_SEATS[spaceNo][index] = item;
        spaceCategory = 1;
      } else {
        this.SPACE_1_TO_6_SEATS[spaceNo][index] = item;
        spaceCategory = 0;
      }
      // reset last book seat data locally
      const { selectedSpaceNo, selectedSpaceCategory, selectedSeatIndex, selectedSeat } = this.state;
      if (selectedSeat !== null) {
        const lastSpace = selectedSpaceCategory === 0 ? this.SPACE_1_TO_6_SEATS : this.SPACE_7_TO_10_SEATS;
        let lastItem = lastSpace[selectedSpaceNo][selectedSeatIndex];
        lastItem.isSelected = false;
        lastSpace[selectedSpaceNo][selectedSeatIndex] = lastItem;
      }
      this.setState({ selectedSpaceNo: spaceNo, selectedSpaceCategory: spaceCategory, selectedSeatIndex: index, selectedSeat: item });
    } else {
      Alert.alert('Error!', 'You already have booked one seat!');
    }
  }

  renderItem = (item, index, spaceNo) => {
    let seatContainerStyle = { ...styles.seatStyle };
    let seatNoStyle = { ...styles.seatNo };
    if (item.isBooked || item.userid != null) {
      seatContainerStyle.backgroundColor = colors.DISABLE_BUTTON_COLOR;
      seatContainerStyle.borderColor = colors.DISABLE_BUTTON_COLOR;
      seatNoStyle.color = 'white';
    } else if (item.isSelected) {
      seatContainerStyle.backgroundColor = 'green';
      seatNoStyle.color = 'white';
    }
    return (
      <TouchableOpacity
        style={[seatContainerStyle]}
        onPress={this.onPressSeat(item, index, spaceNo)}
        disabled={item.isBooked}
        key={`${item.spaceNo} + ${item.seatNo}`}>
        <Text style={seatNoStyle}>{item.seatNo}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { selectedSeat, seatingPlanModal } = this.state;
    return (
      <Stack style={styles.rootContainer}>
        <Header
          headerProps={{
            onPressLeftContent: this.onPressRefresh,
            onPressRightContent: this.logout,
            isCenterDisabled: false,
            leftIcon: <Icon
              type={'general'}
              name={'refresh'}
              size={22}
            />,
            rightContent: [
              {
                text: 'Log Out',
                textStyle: styles.headerTextStyle,
              }
            ]
          }}
        />
        <Box style={styles.container}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <Box style={styles.seatContainer}>
              <Text style={styles.spaceNumber}>SPACE 1</Text>
              {this.SPACE_1_TO_6_SEATS.space1.map((item, index) => this.renderItem(item, index, 'space1'))}
            </Box>

            <Box style={styles.seatContainer}>
              <Text style={styles.spaceNumber}>SPACE 2</Text>
              {this.SPACE_1_TO_6_SEATS.space2.map((item, index) => this.renderItem(item, index, 'space2'))}
            </Box>

            <Box style={styles.seatContainer}>
              <Text style={styles.spaceNumber}>SPACE 3</Text>
              {this.SPACE_1_TO_6_SEATS.space3.map((item, index) => this.renderItem(item, index, 'space3'))}
            </Box>

            <Box style={styles.seatContainer}>
              <Text style={styles.spaceNumber}>SPACE 4</Text>
              {this.SPACE_1_TO_6_SEATS.space4.map((item, index) => this.renderItem(item, index, 'space4'))}
            </Box>

            <Box style={styles.seatContainer}>
              <Text style={styles.spaceNumber}>SPACE 5</Text>
              {this.SPACE_1_TO_6_SEATS.space5.map((item, index) => this.renderItem(item, index, 'space5'))}
            </Box>

            <Box style={styles.seatContainer}>
              <Text style={styles.spaceNumber}>SPACE 6</Text>
              {this.SPACE_1_TO_6_SEATS.space6.map((item, index) => this.renderItem(item, index, 'space6'))}
            </Box>
            <Box style={styles.cabinArea}>
              <Text style={styles.cabinAreaText}>Cabin Area</Text>
            </Box>
            <Box style={styles.seatContainer}>
              <Text style={styles.spaceNumber}>SPACE 7</Text>
              {this.SPACE_7_TO_10_SEATS.space7.map((item, index) => this.renderItem(item, index, 'space7'))}
            </Box>

            <Box style={styles.seatContainer}>
              <Text style={styles.spaceNumber}>SPACE 8</Text>
              {this.SPACE_7_TO_10_SEATS.space8.map((item, index) => this.renderItem(item, index, 'space8'))}
            </Box>

            <Box style={styles.seatContainer}>
              <Text style={styles.spaceNumber}>SPACE 9</Text>
              {this.SPACE_7_TO_10_SEATS.space9.map((item, index) => this.renderItem(item, index, 'space9'))}
            </Box>

            <Box style={styles.seatContainer}>
              <Text style={styles.spaceNumber}>SPACE 10</Text>
              {this.SPACE_7_TO_10_SEATS.space10.map((item, index) => this.renderItem(item, index, 'space10'))}
            </Box>
            <TouchableOpacity
              style={styles.seatingPlanContainer}
              activeOpacity={0.9}
              onPress={() => this.setState({ seatingPlanModal: true })}>
              <Icon type="general" name="info" color={'primary'} size={20} />
              <Text type="small-link" style={styles.seatingPlanText}>Seating Plan</Text>
            </TouchableOpacity>
            <Box style={styles.seatRepresentationBlock}>
              <Box style={styles.seatRepresentationBox}>
                <Box style={styles.bookedSeat} />
                <Text style={styles.seatRepresentationText}>Booked</Text>
              </Box>
              <Box style={styles.seatRepresentationBox}>
                <Box style={styles.availableSeat} />
                <Text style={styles.seatRepresentationText}>Available</Text>
              </Box>
              <Box style={styles.seatRepresentationBox}>
                <Box style={styles.selectedSeat} />
                <Text style={styles.seatRepresentationText}>Selected</Text>
              </Box>
            </Box>
          </ScrollView>
          <Box
            style={styles.buttonContainer}>
            <BoxButton
              buttonStyle={styles.buttonStyle}
              buttonText={'Book Seat'}
              isDisabled={selectedSeat === null}
              onPress={this.onBookSeat}
            />
            {
              selectedSeat !== null ?
                (<Text style={styles.text}> {`Selected seat no - ${selectedSeat.seatNo}`} </Text>)
                : (<Text style={styles.text} />)
            }
          </Box>
        </Box>
        {
          this.state.isLoading &&
          <View style={{
            backgroundColor: 'black',
            opacity: .5,
            ...StyleSheet.absoluteFill,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Spinner />
          </View>
        }
        <Modal
          isVisible={seatingPlanModal}
          onModalHide={(value) => this.setState({ seatingPlanModal: value })}>
          <Image style={styles.imageStyle} 
          source={Images.seatingPlan} />
        </Modal>
      </Stack>
    );
  }
}


export default Dashboard;