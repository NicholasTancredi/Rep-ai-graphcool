import React, { Component } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Animated
} from 'react-native'
import colors from './colors'
import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons'

export default class FabComponent extends Component {
    state = {
        scale: new Animated.Value(0)
    }

    componentDidMount() {
        setTimeout(this.show, 1000)
    }

    animateScale = toValue => (
        Animated
        .spring(
            this.state.scale,
            {toValue}
        )
        .start()
    )

    show = () => this.animateScale(1)

    hide = () => this.animateScale(0)

    render() {
        const {
            size = 54,
            margin = 16,
            onPress,
        } = this.props

        return (
            <Animated.View style={[
                localStyles.fabContainer, {
                    bottom: margin,
                    right: margin,
                    height: size,
                    width: size,
                    borderRadius: size / 2,
                    transform: [{
                        scale: this.state.scale
                    }]
                }]}>
                <TouchableOpacity
                    onPress={onPress}
                    style={[styles.container, {
                        height: size,
                        width: size,
                        borderRadius: size / 2,
                        backgroundColor: colors.main
                    }]}>
                        <Icon
                            size={Math.max(size - 18, 8)}
                            color="white"
                            name="ios-add"
                        />
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

const localStyles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.375,
        shadowRadius: 6,
        shadowOffset: {
            height: 3,
            width: 0
        }
    }
})
