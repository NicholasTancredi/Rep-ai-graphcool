import React, { Component } from 'react'

import {
    TouchableWithoutFeedback,
    Animated,
} from 'react-native'

import styles, {
    borderRadius
} from './styles'

export default class CameraRecordingButtonComponent extends Component {
    constructor(props) {
        super(props)

        this.recording = props.recording

        this.state = {
            scale: new Animated.Value(1),
            borderRadius: new Animated.Value(borderRadius),
        }

        this.onPress = () => {
            this.props.onPress()

            const nextAnimation = {}

            const duration = 125

            if (!this.recording) {
                this.recording = true
                nextAnimation.borderRadius = 12
                nextAnimation.scale = 0.6
            } else {
                this.recording = false
                nextAnimation.borderRadius = borderRadius
                nextAnimation.scale = 1
            }

            Animated.parallel([
                Animated.timing(
                    this.state.borderRadius,
                    ({duration, toValue: nextAnimation.borderRadius})
                ),
                Animated.timing(
                    this.state.scale,
                    ({duration, toValue: nextAnimation.scale})
                ),
            ]).start()
        }

        const container = {
            style: styles.CameraRecordingButtonContainer,
            onPress: this.onPress,
        }

        this.render = () => (
            <TouchableWithoutFeedback {...container}>
                <Animated.View
                    style={[styles.CameraRecordingButtonContent, {
                        borderRadius: this.state.borderRadius,
                        transform: [{scale: this.state.scale}],
                    }]}
                />
            </TouchableWithoutFeedback>
        )
    }

    componentDidMount() {
        // TODO: Remove, FOR DEMO
        if (this.props.recording) {
            setTimeout(() => {
                const nextAnimation = {}
                this.recording = true
                nextAnimation.borderRadius = 12
                nextAnimation.scale = 0.6

                Animated.parallel([
                    Animated.timing(
                        this.state.borderRadius,
                        ({duration: 125, toValue: nextAnimation.borderRadius})
                    ),
                    Animated.timing(
                        this.state.scale,
                        ({duration: 125, toValue: nextAnimation.scale})
                    ),
                ]).start()
            }
            , 500)
        }
    }
}
