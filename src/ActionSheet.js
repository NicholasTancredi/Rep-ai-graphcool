import {
    ActionSheetIOS,
    Platform
} from 'react-native'
// import React, { Component } from 'react'
// import {
//     Modal,
//     View,
//     TouchableHighlight,
//     StyleSheet,
//     Text,
//     AsyncStorage,
//     ActionSheetIOS,
//     Platform
// } from 'react-native'
//
// const ActionSheetButton = ({
//     onPress,
//     title
// }) => (
//     <TouchableHighlight
//         underlayColor="grey"
//         style={styles.buttonView}
//         onPress={onPress}
//     >
//         <Text style={styles.title}>
//             {title}
//         </Text>
//     </TouchableHighlight>
// )
//
// const styles = StyleSheet.create({
//     title: {
//         fontSize: 19,
//     },
//
//     buttonView: {
//         padding: 16,
//         backgroundColor: '#f1f1f1',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '70%',
//     },
//
//     modalView: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'rgba(0,0,0,0.6)',
//     },
// })
//
// class ActionSheet extends Component {
//     state = {}
//
//     componentDidMount() {
//         const {
//             handleAction
//         } = this.props
//
//         if (Platform.OS === 'ios') {
//             const options = this.props.options.concat('Cancel')
//             ActionSheetIOS.showActionSheetWithOptions({
//                 options,
//                 destructiveButtonIndex: options.length - 2,
//                 cancelButtonIndex: options.length - 1,
//             }, i => handleAction(options[i]))
//         }
//     }
//
//     close = () => {
//         this.setState({
//             hidden: true
//         })
//     }
//
//     render() {
//         const {
//             handleAction,
//             options
//         } = this.props
//
//         if (Platform.OS === 'ios') {
//             return null
//         }
//
//         return (
//             <Modal
//                 animationType="slide"
//                 transparent={false}
//                 visible={!this.state.hidden}
//                 onRequestClose={() => {}}
//             >
//                 <View style={styles.modalView}>
//                     {
//                         options.map((option, key) => (
//                             <ActionSheetButton
//                                 key={key}
//                                 title={option}
//                                 onPress={() => {
//                                     handleAction(option)
//                                 }}
//                             />
//                         ))
//                     }
//
//                     <ActionSheetButton
//                         onPress={this.close}
//                         title={'Cancel'}
//                     />
//                 </View>
//             </Modal>
//         )
//     }
// }
export default (
    callback,
    options = [
        'View',
        'Edit',
        'Delete',
        'Cancel',
    ]
) => {
    if (Platform.OS === 'ios') {
        return ActionSheetIOS
        .showActionSheetWithOptions({
            options,
            destructiveButtonIndex: options.length - 2,
            cancelButtonIndex: options.length - 1,
        }, i => callback(options[i]))
    }
    // return
}
