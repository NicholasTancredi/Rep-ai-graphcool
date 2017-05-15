import React, { Children } from 'react'
import styles from './styles'

import {
    View,
    Button
} from 'react-native'

import colors from '../colors'

export default ({
    handleCancel,
    handleAccept,
    children
}) => (
    <View style={styles.previewContainer}>
        {Children.only(children)}
        <View style={styles.previewContainerTab}>
            <Button
                title="CANCEL"
                color={colors.main}
                onPress={this.handleCancel}
            />
            <Button
                title="ACCEPT"
                color={colors.main}
                onPress={handleAccept}
            />
        </View>
    </View>
)
