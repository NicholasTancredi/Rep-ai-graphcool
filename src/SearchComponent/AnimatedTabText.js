import React, { Component } from 'react'
import {
    Animated
} from 'react-native'

import styles from './styles'

export default class AnimatedTabText extends Component {
    render() {
        const {
            title,
            focused
        } = this.props

        return (
            <Animated.Text style={[styles.labelStyle, {
                position: 'absolute',
                bottom: -5,
                opacity: focused ? 1 : 0,
                backgroundColor: 'transparent'
            }]}>
                {title}
            </Animated.Text>
        )
    }
}
