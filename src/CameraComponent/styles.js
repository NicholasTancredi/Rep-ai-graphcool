import { StyleSheet, Dimensions } from 'react-native'
import colors from '../colors'
export const size = 48
export const borderWidth = 4
export const borderRadius = size / 2

export default StyleSheet.create({
    camera: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    },

    cameraAbsolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    imagePreview: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    swapCameraButtonIcon: {
        paddingTop: 12,
        paddingRight: 24,
        backgroundColor: 'rgba(0,0,0,0)'
    },

    swapCameraButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },

    tabBar: {
        backgroundColor: 'white',
    },

    tabBarIndicator: {
        backgroundColor: colors.main,
    },

    tabBarLabel: {
        color: colors.main,
        fontSize: 19,
    },

    previewContainer: {
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    previewContainerTab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        height: 55,
        width: '100%',
    },

    viewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 24,
    },

    CameraRecordingButtonContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth,
        width: size + (borderWidth * 3),
        height: size + (borderWidth * 3),
        borderRadius: (size + (borderWidth * 3)) / 2,
    },

    circle: {
        width: size,
        height: size,
        backgroundColor: 'white',
        borderRadius,
    },
    
    CameraRecordingButtonContent: {
        width: size,
        height: size,
        backgroundColor: colors.main,
        borderRadius,
    }
})
