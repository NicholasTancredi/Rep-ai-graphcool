import {
    StyleSheet,
} from 'react-native'

import colors from '../colors'

export default StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#f1f1f1',
    },
    tabBarText: {
        color: colors.main,
        fontSize: 11,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    tabBarAnimatedIcon: {
        height: 32,
        marginTop: -1,
        marginBottom: -2,
    },
    tabBarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
