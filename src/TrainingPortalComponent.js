import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'

import { TrainingPortalComponent } from './UserTrainingPortalComponent'
// TODO: Refactor - Wierd file location
class PortalComponent extends Component {
    render() {
        const GraphComponent = graphql(gql `
            query {
                getUser(id: "${this.props.navigation.state.params.user.id}") {
                    username
                    email
                    avatarUri
                    sessions {
                        edges {
                            node {
                                title
                                id
                            }
                        }
                    }
                    exercises {
                        edges {
                            node {
                                title
                                reps
                                sets
                                id
                            }
                        }
                    }
                }
            }
        `)(TrainingPortalComponent)

        return <GraphComponent navigation={this.props.navigation}/>
    }
}

export default PortalComponent