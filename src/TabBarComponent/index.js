import React from 'react'
import {
    Animated,
} from 'react-native'

import styles from './styles'

import TabBarItemComponent from './TabBarItemComponent'

export default ({
    height,
    marginBottom,
    active,
    setActive,
    tabs
}) => (
    <Animated.View
        style={[
            styles.tabBar, {
                height,
                marginBottom
            }
        ]}>
        {
            tabs.map(({
                title,
                name
            }, key) => (
                <TabBarItemComponent
                    key={key}
                    title={title}
                    name={name}
                    active={active}
                    onPress={() => setActive(title)}
                />
            ))
        }
    </Animated.View>
)
