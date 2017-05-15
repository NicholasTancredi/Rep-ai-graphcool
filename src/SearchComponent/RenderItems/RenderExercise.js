import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

export default class RenderExercise extends Component {
    render() {
        return (
            <View style={styles.containerStyle}/>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        height: 10,
        backgroundColor: 'blue'
    }
})
