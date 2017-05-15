import React from 'react'
import {
    Animated,
    TouchableOpacity,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import colors from '../colors'
import styles from './styles'
const AnimatedIcon = Animated.createAnimatedComponent(Icon)

export default ({
    onPress,
    title,
    active,
    size = 32,
    iconStyle,
    name
}) => {
    const isActive = active === title

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.tabBarItem}>

            <AnimatedIcon
                color={!isActive ? colors.lightGrey : colors.main}
                size={size}
                name={!isActive ? (name + '-outline') : name}
                style={[styles.tabBarAnimatedIcon, iconStyle]}
            />

            {isActive && (
                <Animated.Text style={styles.tabBarText}>
                    {title}
                </Animated.Text>
            )}
        </TouchableOpacity>
    )
}
