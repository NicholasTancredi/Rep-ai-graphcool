import { StyleSheet } from 'react-native';
import colors from '../colors';

export default StyleSheet.create({
    headerContainerStyle: {
        height: 120,
        flexDirection: 'row',
        padding: 20,
    },

    headerContentContainerStyle: {
        flex: 1,
        alignItems: 'flex-start'
    },

    headerNameStyle: {
        fontSize: 18,
        letterSpacing: 0.5,
        color: colors.main,
    },

    headerTeamStyle: {
        fontSize: 11,
        letterSpacing: 0.5,
        color: '#777',
        marginBottom: 12
    },

    headerFollowButtonStyle: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: colors.main,
        width: 85
    },

    headerFollowButtonTextStyle: {
        color: 'white',
        alignSelf: 'center'
    },

    profileImage: {
        borderRadius: 62 / 2,
        width: 62,
        height: 62,
        marginRight: 21,
    },

    imagePlaceholder: {
        backgroundColor: colors.main,
        alignItems: 'center',
        justifyContent: 'center',
    },

    flex: {
        flex: 1
    },

    contentButtonStyle: {
        margin: 5,
        padding: 10,
        paddingBottom: 0,
        borderColor: '#e6e6ed',
        borderWidth: 1,
        borderRadius: 4
    }
});
