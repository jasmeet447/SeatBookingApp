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
} from 'react-native';
const {width, height} = Dimensions.get('window');
const selectedColor = '#8EF0E7'
const unSelectedColor = '#3493FF'
const alreadyBookedColor = 'gray'
const TotalSeats = 120
const COLS = 20;
const ROWS = Math.ceil(TotalSeats / COLS)
const TIMING = 500;
const TEXT_HEIGHT = 20;
let seats = [];
let seatsAnimation = [];

for (var i = 0; i < ROWS + COLS - 1; i++) {
  seatsAnimation.push(i);
}

if (TotalSeats > 0) {
Array(TotalSeats)
  .join(' ')
  .split(' ')
  .map((_, i) => {
    const currentIndex = (i % COLS) + (Math.floor(i / COLS) % ROWS);
    const currentItem = {
      label: i + 1 < 10 ? '0' + (i + 1) : i + 1,
      s: currentIndex,
      key: i,
      animated: new Animated.Value(1),
      ColumnIndex: i % COLS,
      RowIndex: (Math.floor(i / COLS) % ROWS)
    };
    seats.push(currentItem);
  });
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      selectedItems: [],
    };

    this.selectionAnimation = new Animated.Value(0);
    this.animatedValue = [];
    seatsAnimation.forEach(value => {
      this.animatedValue[value] = new Animated.Value(0);
    });
  }

  animate = () => {
    const animations = seatsAnimation.map(item => {
      return Animated.timing(this.animatedValue[item], {
        toValue: this.state.finished ? 0 : 1,
        duration: TIMING,
        useNativeDriver: true
      });
    });
    Animated.sequence([Animated.stagger(TIMING * 0.04, animations)]).start(
      () => {
        this.setState({
          finished: !this.state.finished,
          selectedItems: [],
        });

        // this.selectionAnimation.setValue(0);
        // Animated.timing(this.selectionAnimation, {
        //   toValue: 0,
        //   duration: 500,
        //   useNativeDriver: true,
        //   // easing: Easing.elastic(1.3),
        // }).start();
      },
    );
  };

  renderItem = ({item}) => {
    const i = item.key;
    const scale = this.animatedValue[item.s].interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1],
    });
    const {selectedItems} = this.state;
    const isSelected = selectedItems.includes(item.key);
    const itemPressScale = item.animated.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1],
    });

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          const selected = isSelected
            ? selectedItems.filter(i => i !== item.key)
            : [item.key];

          item.animated.setValue(0);
          this.setState(
            {
              selectedItems: selected,
            },
            () => {
              console.log('selected items ------ ', this.state.selectedItems);
              Animated.parallel([
                Animated.timing(this.selectionAnimation, {
                  toValue: -TEXT_HEIGHT * selected.length,
                  duration: 500,
                  useNativeDriver: true,
                  easing: Easing.elastic(1.3),
                }),
                Animated.timing(item.animated, {
                  toValue: 1,
                  duration: 200,
                  useNativeDriver: true
                }),
              ]).start();
            },
          );
        }}
        style={{
          opacity: 1,
          padding: 2,
          paddingBottom: item.RowIndex !== 0 && (item.RowIndex + 1) % 2 === 0 ? 30 : 2
        }}>
        <Animated.View
          style={{
            transform: [
              {
                scale: item.animated,
              },
            ],
          }}>
          <Animated.View
            style={[
              {
                backgroundColor: isSelected ? selectedColor : unSelectedColor,
              },
              styles.item,
              {
                transform: [
                  {
                    scale,
                  },
                ],
              },
            ]}>
            <Animated.Text style={[styles.itemText]}>
              {item.label}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    if (seats.length <= 0) {
      return <View />
    }
    return (
      <View style={styles.container}>
        <View
          style={{
            height: height * 0.1,
            width: width,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text style={{fontSize: 14, fontWeight: '700', color: '#333'}}>
            Select Seats
          </Text>
          <TouchableOpacity
            name="refresh"
            size={22}
            color="#666"
            backgroundColor="transparent"
            style={{padding: 10}}
            onPress={this.animate}>
            <Text>Refresh</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={COLS}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          extraData={this.state.selectedItems}
          data={seats}
          style={{flex: 0.8}}
          renderItem={this.renderItem}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            flex: 0.15,
          }}>
            {this.state.selectedItems.length > 0 && <Text style={styles.text}>Location index Selected: {this.state.selectedItems} </Text>}
            {/* <View
            style={{
              height: TEXT_HEIGHT,
              overflow: 'hidden',
              backgroundColor: 'transparent',
            }}>
             <Animated.View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                transform: [
                  {
                    translateY: this.selectionAnimation,
                  },
                ],
              }}>
              {Array(ROWS * COLS + 1)
                .join(' ')
                .split(' ')
                .map((_, i) => {
                  return (
                    <View
                      key={i}
                      style={{
                        height: TEXT_HEIGHT,
                        width: TEXT_HEIGHT * 1.4,
                        marginRight: 4,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                      }}>
                      <Text style={[styles.text]}>{this.state.selectedItems}</Text>
                    </View>
                  );
                })}
            </Animated.View> 
            </View> */}
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
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
  text: {fontSize: 15, fontWeight: '500'},
});
