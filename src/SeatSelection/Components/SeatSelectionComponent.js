import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, Easing, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { styles } from '../Styles/Styles';


export default function SeatSelectionComponent(props) {
    const seatsCount = props?.totalSeatsCount || 0
    const [totalSeats, setTotalSeats] = useState([])
    const [isSeatsArrayCreated, setSeatsArrayCreated] = useState(false)
    const [finished, setFinished] = useState(false)
    const [selectedItems, setSelectedItems] = useState(props?.selectedItems || [])
    const [seatsAnimation, setSeatsAnimation] = useState([])
    const [animatedValue, setAnimatedValue] = useState([])
    const COLS = props?.ColumnsCount ? props?.ColumnsCount : 0
    const ROWS = Math.ceil(seatsCount / COLS)
    const alreadyBookedSeats = props?.bookedSeatsData || []
    let selectionAnimation = new Animated.Value(0);

    const createSeatings = useCallback(() => {
        if (seatsCount > 0) {
            var seatsAnimationArr = [];
            let animatedValueArr = []
            for (let i = 0; i < seatsCount && (ROWS + COLS - 1); i++) {
                seatsAnimationArr.push(new Animated.Value(0));
                animatedValueArr.push(new Animated.Value(0));
            }
            setAnimatedValue(animatedValueArr)
            setSeatsAnimation(seatsAnimationArr)
            let seats = []
            Array(seatsCount)
                .join(' ')
                .split(' ')
                .map((_, i) => {
                    const currentIndex = (i % COLS) + (Math.floor(i / COLS) % ROWS);
                    const currentItem = {
                        label: 'Seat ' + `${i + 1 < 10 ? '0' + (i + 1) : i + 1}`,
                        currentIndex: currentIndex,
                        key: i,
                        animated: new Animated.Value(1),
                        ColumnIndex: i % COLS,
                        RowIndex: (Math.floor(i / COLS) % ROWS)
                    };
                    seats.push(currentItem);
                });
            setTotalSeats(seats)
            setSeatsArrayCreated(true)
        }
    }, [totalSeats, seatsAnimation, animatedValue])

    useEffect(() => {
        createSeatings()
    }, [isSeatsArrayCreated]);

    const animate = () => {
        const animations = seatsAnimation?.map(item => {
            return Animated.timing(animatedValue[item], {
                toValue: finished ? 0 : 1,
                duration: styles.TIMING,
                useNativeDriver: true
            });
        });
        Animated.sequence([])?.start(() => {
            setFinished(!finished)
            setSelectedItems([])
        });
    };

    useEffect(() => {
        animate()
    }, [props.onPressRefresh])

    const renderItem = (item) => {
        const i = item?.key;
        const scale = animatedValue[item?.currentIndex]?.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0, 1],
        });
        const isSelected = selectedItems.includes(item?.key);
        const itemPressScale = item?.animated?.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0, 1],
        });
        const isAlreadyBooked = alreadyBookedSeats.filter(i => i.seatNo == item.key + 1).length > 0
        var bgColor = isSelected ? styles.selectedColor : styles.unSelectedColor
        if (isAlreadyBooked) {
            bgColor = styles.alreadyBookedColor
        }
        return (
            <TouchableOpacity

                activeOpacity={isAlreadyBooked ? 1 : 0.5}
                onPress={() => {
                    if (isAlreadyBooked) return
                    const selected = isSelected ? selectedItems.filter(i => i !== item?.key) : [item?.key];
                    item?.animated?.setValue(0);
                    setSelectedItems(selected)
                    Animated.parallel([
                        Animated.timing(selectionAnimation, {
                            toValue: -(styles.TEXT_HEIGHT * selected.length),
                            duration: 500,
                            useNativeDriver: true,
                            easing: Easing.elastic(1.3),
                        }),
                        Animated.timing(item?.animated, {
                            toValue: 1,
                            duration: 200,
                            useNativeDriver: true
                        }),
                    ]).start();
                    props.onSelectItem(item, selected.length > 0)
                }}
                style={{
                    opacity: 1,
                    padding: 2,
                    paddingBottom: item?.RowIndex !== 0 && (item?.RowIndex + 1) % 2 === 0 ? 30 : 2
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
                                backgroundColor: bgColor,
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
                            {item?.label}
                        </Animated.Text>
                    </Animated.View>
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        <Animated.FlatList
            numColumns={COLS}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            bounces={false}
            keyExtractor={item => item.key}
            extraData={selectedItems}
            data={totalSeats}
            scrollEnabled={true}
            contentContainerStyle={{ justifyContent: 'flex-start' }}
            renderItem={({ item }) => renderItem(item)}
            scrollToOverflowEnabled={true}
            style={{ flex: 0.6 }}
        />
    );
}