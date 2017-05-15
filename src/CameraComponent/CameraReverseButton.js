import React from 'react'

import {
    TouchableOpacity
} from 'react-native'

import styles from './styles'

import Icon from 'react-native-vector-icons/Ionicons'

export default ({
    onPress
}) => (
    <TouchableOpacity
        style={styles.swapCameraButton}
        onPress={onPress}>
            <Icon
                name="ios-reverse-camera"
                size={38}
                color="white"
                style={styles.swapCameraButtonIcon}
            />
    </TouchableOpacity>
)
