import React, {Component} from 'react';
import { Header, Stack, Text, Input, Modal, ModalContent, CodeInput } from '@pentair-ui/mobile';
import {SpaceSelectionComponentStyles as styles} from '../Styles/SpaceSelectionComponentStyles'
import { TouchableOpacity, View } from 'react-native';
import { Button } from '@pentair-ui/mobile/lib/commonjs/components/Button';

export default class SpaceSelectionComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };

    
  }

  componentDidMount() {
    
  }

  render() {
    const { horizontalSpaceIds, verticalSpaceIds, containerStyle } = this.props
    return(
        <Stack style={[styles.container, containerStyle]}>
            <Stack style={styles.verticalCardsContainer}>
                {
                    verticalSpaceIds.map(id => {
                        return(
                            <Button 
                            style={styles.verticalCards}
                            onPress={() => {console.log('space press------', id)}}
                            >
                                <View style={[styles.verticalCardsContainer, {flex: 1}]}>
                                    <Text style={styles.itemText}> {`Space`} </Text>
                                    <Text style={styles.itemText}> {id} </Text>
                                </View>
                            </Button>
                        )
                    })
                }
                
            </Stack>
            
            <Stack style={{flex: 0.01}}/>
            
            <Stack style={styles.horizontalCardsContainer}>
                {
                    horizontalSpaceIds.map(id => {
                        return(
                            <TouchableOpacity 
                            style={styles.horizontalCards}
                            activeOpacity={1}
                            onPress={() => {console.log('space press------', id)}}
                            >
                                <Stack style={{flexDirection: 'column',}}>
                                    <Text style={styles.itemText}> {`Space`} </Text>
                                    <Text style={styles.itemText}> {id} </Text>
                                </Stack>
                            </TouchableOpacity>
                        )
                    })
                }

            </Stack>
        </Stack> 
    )
  } 
}