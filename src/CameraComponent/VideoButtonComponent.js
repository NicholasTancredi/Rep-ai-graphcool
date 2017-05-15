import React from 'react'

import { View } from 'react-native'

import styles from './styles'
import CameraRecordingButtonComponent from './CameraRecordingButtonComponent'

export default ({ onPress }) => (
    <View style={styles.viewContainer}>
        <View style={styles.CameraRecordingButtonContainer}>
            <CameraRecordingButtonComponent
                onPress={onPress}
            />
        </View>
    </View>
)
