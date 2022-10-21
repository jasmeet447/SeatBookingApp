import React from 'react';
import { FlatList } from "react-native";


export default function SeatSelectionComponent(props) {
    return(
        <FlatList
          numColumns={props.ColumnsCount}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          extraData={props.extraData}
          data={props.seatsData}
          style={{flex: 0.8}}
          renderItem={props.renderItem}
        />
    );
}
