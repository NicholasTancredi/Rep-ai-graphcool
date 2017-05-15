import React, { Component } from 'react'

import {
    View,
    Image
} from 'react-native'

import composed from './graphql'
import Camera from 'react-native-camera'

import styles from './styles'
import VideoPlayer from '../VideoPlayer'

import PhotoButtonComponent from './PhotoButtonComponent'
import VideoButtonComponent from './VideoButtonComponent'
import TabViewComponent from './TabViewComponent'
import CameraPreviewComponent from './CameraPreviewComponent'
import CameraReverseButton from './CameraReverseButton'

class CameraComponent extends Component {
    state = {
        type: this.props.type || 'back',
    }

    handleCancel = () => {
        this.capturedProps = null
        this.setState({
            showImagePreview: false,
            showVideoPreview: false,
        })
    }

    handlePhotoButtonPress = () => {
        this.camera.capture()
        .then(capturedProps => {
            this.capturedProps = capturedProps
            this.setState({ showImagePreview: true })
        })
    }

    handleVideoButtonPress = () => {
        this.capturedProps = {}

        if (this.capturingVideo) {
            return this.camera.stopCapture()
        }

        this.capturingVideo = true
        this.camera
        .capture({ mode: Camera.constants.CaptureMode.video })
        .then(capturedProps => {
            this.capturedProps = capturedProps
            this.capturingVideo = false
            this.setState({ showVideoPreview: true })
        })
        .catch(console.error)
    }

    handleSwapCamera = () => {
        this.setState(({ type }) => ({
            type: (type === 'front')
            ? 'back' : 'front'
        }))
    }

    render() {
        const {
            handleVideo,
            handlePhoto,
            captureQuality
        } = this.props

        const {
            constants: {
                Type,
                CaptureQuality
            }
        } = Camera

        return (
            <View style={{flex: 1}}>
                <Camera
                    style={styles.cameraAbsolute}
                    type={Type[this.state.type]}
                    captureQuality={CaptureQuality[captureQuality || 'medium']}
                    captureTarget={Camera.constants.CaptureTarget.disk}
                    ref={r => {
                        this.camera = r
                    }}
                />

                <View style={styles.camera}>
                    {handleVideo && handlePhoto && (
                        <TabViewComponent
                            camera={this.camera}
                            onPhotoButtonPress={
                                () => this.handlePhotoButtonPress()
                            }
                            onVideoButtonPress={
                                () => this.handleVideoButtonPress()
                            }
                        />
                    )}

                    {!handleVideo && (
                        <PhotoButtonComponent
                            camera={this.camera}
                            onPress={() => this.handlePhotoButtonPress()}
                        />
                    )}

                    {!handlePhoto && (
                        <VideoButtonComponent
                            camera={this.camera}
                            onPress={() => this.handleVideoButtonPress()}
                        />
                    )}

                    <CameraReverseButton
                        onPress={() => this.handleSwapCamera()}
                    />
                </View>

                {this.state.showVideoPreview && (
                    <CameraPreviewComponent
                        handleCancel={() => this.handleCancel()}
                        handleAccept={() => handleVideo(this.capturedProps)}>
                        <VideoPlayer uri={this.capturedProps.path} />
                    </CameraPreviewComponent>
                )}

                {this.state.showImagePreview && (
                    <CameraPreviewComponent
                        handleCancel={() => this.handleCancel()}
                        handleAccept={() => handlePhoto(this.capturedProps)}>
                        <Image
                            style={styles.imagePreview}
                            source={{uri: this.capturedProps.path}}
                        />
                    </CameraPreviewComponent>
                )}
            </View>
        )
    }
}

// The graphql compose function is in './graphql.js'
export default composed(CameraComponent)
