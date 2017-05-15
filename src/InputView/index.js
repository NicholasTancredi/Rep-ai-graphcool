import React, {Component} from 'react'
import ComponentView from './view'

export default class LocalComponent extends Component {
    render() {
        return (
            <ComponentView
                {...this.props}
                label={this.props.label}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.props.placeholderTextColor}
                onChangeText={this.props.onChangeText}
                values={this.props.values}
                style={this.props.style}
                labelStyle={this.props.labelStyle}
                contentContainerStyle={this.props.contentContainerStyle}
            />
        )
    }
}
