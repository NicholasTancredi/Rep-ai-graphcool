import React from 'react'
import { StackNavigator } from 'react-navigation'
import colors from './colors'

import Routes from './Routes'

export default ({
    initialRouteName,
    initialRouteParams,
}) => {
    const ActiveComponent = StackNavigator(Routes, {
        initialRouteName,
        initialRouteParams,
        navigationOptions: {
            header: {
                tintColor: 'white',
                style: {
                    backgroundColor: colors.main
                },
                titleStyle: {
                    color: 'white',
                },
            }
        }
    })

    return <ActiveComponent />
}
