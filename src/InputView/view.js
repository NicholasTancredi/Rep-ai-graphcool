import React from 'react'

import {
    View,
    Text,
    TextInput,
} from 'react-native'

import styles from './styles'

export default (props) => {
    return (
        <View style={[styles.View, props.contentContainerStyle]}>
            <Text style={[styles.Text, props.labelStyle]}>
                {String(props.label).toUpperCase()}
            </Text>
            <TextInput
                {...props}
                {...props.values}
                style={[styles.TextInput, props.style]}
                placeholder={props.placeholder || ''}
                placeholderTextColor={props.placeholderTextColor || '#ccc'}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}
