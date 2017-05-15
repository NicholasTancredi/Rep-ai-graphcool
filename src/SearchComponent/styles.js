import { StyleSheet, Dimensions } from 'react-native';
import colors from '../colors';

export default StyleSheet.create({
    flex: {
        flex: 1
    },
    searchContainerStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    searchBarStyle: {
        padding: 5,
        marginTop: 10,
        flexDirection: 'row',
    },
    searchInputStyle: {
        height: 40,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
    },

    resultStyle: {
        margin: 10
    },
    labelStyle: {
        color: colors.main,
        fontSize: Dimensions.get('window').width <= 320 ? 9 : 11,
    },

});
