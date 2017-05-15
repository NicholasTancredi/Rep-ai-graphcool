import React, { Component } from 'react'

import {
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native'

import Video from 'react-native-video'
import colors from './colors'

export default class VoiceToTextComponent extends Component {
    static navigationOptions = {
        header: {
            style: {
                backgroundColor: 'rgba(0,0,0,0)',
                top: 0,
                left: 0,
                right: 0,
                shadowOpacity: 0,
            },
            tintColor: 'white',
            // left: null,
        },
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                this.props.navigation.state.params.tabBarShow()
                this.props.navigation.navigate('List')
            }}>
            <View style={{flex: 1, backgroundColor: colors.main,

            }}>
            <Video
                resizeMode="cover"
                style={{

                    top: -114 + 49 - 3,
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
  }}
                source={require('./images/voice.mp4')}
            />
        </View>
            </TouchableWithoutFeedback>
        )
    }
}
