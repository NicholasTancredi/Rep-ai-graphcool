import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import styles from '../styles';

import RenderUser from './RenderUser';
import RenderExercise from './RenderExercise';
import RenderSession from './RenderSession';
import RenderProgram from './RenderProgram';
import RenderTeam from './RenderTeam';

export default class RenderItems extends Component {
    renderType() {
        console.log(this.props.route)
        switch (this.props.route) {
            case 'Users':
                return <RenderUser id={this.props.id} />
            case 'Exercises':
                return <RenderExercise id={this.props.id} />
            case 'Sessions':
                return <RenderSession id={this.props.id} />
            case 'Programs':
                return <RenderProgram id={this.props.id} />
            case 'Teams':
                return <RenderTeam id={this.props.id} />
        }
    }

    render() { //{this.renderType()} in text
        return (
            <View style={styles.flex}>
                <Text>{this.props.id}</Text>
            </View>
        )
    }
}
