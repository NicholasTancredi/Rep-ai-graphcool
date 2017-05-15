import React, { Component } from 'react'

import { GiftedChat } from 'react-native-gifted-chat'

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
  }
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }
  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
//
// export default class MessagesDataComponent extends Component {
//     static navigationOptions = {
//         title: 'Messages',
//     }
//
//     render() {
//
//         const messageObj = {
//           _id: 1,
//           text: 'My message',
//           createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
//           user: {
//             _id: 2,
//             name: 'React Native',
//             avatar: 'https://facebook.github.io/react/img/logo_og.png',
//           },
//           image: 'https://facebook.github.io/react/img/logo_og.png',
//           // additional custom parameters
//         }
//
//         return <MessagesComponent
//             messages={[
//                 messageObj
//             ]}
//         />
//     }
// }
//
// class MessagesComponent extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             messages: props.messages || []
//         }
//     }
//
//     onSend = (messages = []) => {
//         this.setState((previousState) => {
//             return {
//                 messages: GiftedChat.append(previousState.messages, messages),
//             }
//         })
//     }
//
//     render() {
//         return (
//             <GiftedChat
//                 messages={this.state.messages}
//                 onSend={this.onSend}
//                 user={{_id: 1}}
//             />
//         )
//     }
// }
