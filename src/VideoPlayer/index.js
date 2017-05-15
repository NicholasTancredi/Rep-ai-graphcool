import React, {Component} from 'react'

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Image,
    Dimensions,
} from 'react-native'

import Video from 'react-native-video'
import * as Progress from 'react-native-progress'
import Icon from 'react-native-vector-icons/Ionicons'
import CameraRecordingButtonComponent from '../CameraComponent/CameraRecordingButtonComponent'
export default class VideoPlayer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            width: 0,
            paused: true,
            loaded: false,
            opacity: new Animated.Value(0),
        }

        this.handle = {}

        this.handle.press = () => this.setState({
            paused: !this.state.paused
        }, Animated.sequence([
            Animated.timing(
                this.state.opacity,
                {toValue: 1, duration: 250}
            ),
            Animated.delay(5000),
            Animated.timing(
                this.state.opacity,
                {toValue: 0, duration: 250}
            ),
        ]).start())

        this.handle.layout = ({nativeEvent: {layout: {width}}}) =>
            !this.state.width && this.setState({width})

        this.handle.load = ({duration}) => (duration < 0.067) &&
            console.error('user may have no phone memory left') ||
            this.setState({loaded: true},
                () => Animated.timing(
                    this.state.opacity,
                    {toValue: 1}
                ).start()
            )

        this.handle.progress = ({currentTime, playableDuration}) => {
            const progress = currentTime / playableDuration
            progress === 1 ? this.setState({progress: 0})
            : this.setState({progress})
        }

        const resizeMode = this.props.resizeMode || 'cover'

        this.staticProps = {
            container: {
                style: [{
                    flex: 1,
                    width: Dimensions.get('window').width,
                }].concat(props.contentContainerStyle),
                onLayout: this.handle.layout,
            },

            TouchableOpacity: {
                style: styles.flex,
                onPress: this.handle.press,
            },

            Video: {
                resizeMode,
                ref: r => {
                    this.player = r
                },
                style: styles.fill,
                source: {uri: this.props.uri},
                rate: 1,
                volume: 1,
                muted: false,
                repeat: true,
                playInBackground: false,
                playWhenInactive: false,
                progressUpdateInterval: 250,
                onLoad: this.handle.load,
                onProgress: this.handle.progress,
            },

            Icon: {
                size: 64,
                color: "white",
            },

            ProgressBar: {
                color: 'rgba(255, 255, 255, .5)',
            },

            Image: {
                resizeMode,
                style: styles.fill,
                source: {uri: this.props.thumbnail},
            }
        }

        // TODO: Later to trigger fullscreen
        // this.player.presentFullscreenPlayer()

        // To set video position in seconds (seek)
        // this.player.seek(0)
    }
    componentDidMount() {
        this.handle.press()
    }
    render() {
        const _props = {
            animatedViewStyle: [
                styles.AnimatedView, {opacity: this.state.opacity}],
            Video: {
                ...this.staticProps.Video,
                paused: this.state.paused,
            },
            Icon: {...this.staticProps.Icon,
                name: `ios-${this.state.paused ? 'play' : 'pause'}`
            },
            ProgressBar: {...this.staticProps.ProgressBar,
                progress: this.state.progress,
                width: this.state.width - 16,
            },
        }

        if (this.props.navigation) {
            if (this.props.navigation.state.params.source) {
                _props.Video.source = this.props.navigation.state.params.source
            }
        }

        if (this.props.source) {
            _props.Video.source = this.props.source
        }

        if (this.props.demo) {
            return (
                <View {...this.staticProps.container}>
                    <Video {..._props.Video} />
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingBottom: 20,
                    }}>
                    <CameraRecordingButtonComponent
                        onPress={() => {
                            this.handle.press()
                            this.props.navigate('VoiceToTextComponent',
                            {...this.props})
                        }}
                        recording={true}
                    />
                    </View>
                </View>
            )
        }

        return (
            <View {...this.staticProps.container}>
                <Video {..._props.Video} />
                <TouchableOpacity {...this.staticProps.TouchableOpacity}>
                    <Animated.View style={_props.animatedViewStyle}>
                        <Icon {..._props.Icon} />
                    </Animated.View>
                </TouchableOpacity>
                <View style={styles.progressBarView}>
                    <Progress.Bar {..._props.ProgressBar} />
                </View>
                {!this.props.thumbnail ? null : this.state.loaded ? null :
                    <Image {...this.staticProps.Image} />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flex: {flex: 1},
    fill: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    progressBarView: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        right: 8,
        height: 8,
    },
    AnimatedView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
