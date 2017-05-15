import React from 'react'

import {
    View,
    TouchableOpacity,
} from 'react-native'

import styles from './styles'

export default ({ onPress }) => (
    <View style={styles.viewContainer}>
        <TouchableOpacity
            onPress={onPress}
            style={styles.CameraRecordingButtonContainer}>
            <View style={styles.circle} />
        </TouchableOpacity>
    </View>
)
