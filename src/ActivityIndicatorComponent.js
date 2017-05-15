import React from 'react'
import { ActivityIndicator } from 'react-native'
import styles from './styles'
import colors from './colors'

export default (props = {}) => (
    <ActivityIndicator
        size="large"
        color={colors.main}
        {...props}
        style={[styles.container].concat(props.style || {})}
    />
)
