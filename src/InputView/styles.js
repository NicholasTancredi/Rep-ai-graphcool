import {StyleSheet} from 'react-native'
// import {blue} from 'rep-colors'

export default StyleSheet.create({
    View: {
        marginTop: 12,
        height: 64,
        borderColor: '#f1f1f1',
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOpacity: .1,
        shadowOffset: {
            height: 1,
        },
    },

    Text: {
        color: '#333',
        fontSize: 11,
        letterSpacing: 1,
        paddingLeft: 12,
        paddingTop: 9,
    },

    TextInput: {
        flex: 1,
        padding: 12,
    },
})
