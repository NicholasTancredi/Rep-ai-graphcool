import { gql, graphql, compose } from 'react-apollo'

export const CreateImageMutation =  gql `
    mutation CreateImageMutation($input: CreateImageInput!) {
        createImage(input: $input) {
            changedImage {
                id
            }
        }
    }
`

export const CreateVideoMutation =  gql `
    mutation CreateVideoMutation($input: CreateVideoInput!) {
        createVideo(input: $input) {
            changedVideo {
                id
            }
        }
    }
`

export default (Component) => compose(
    graphql(CreateImageMutation, {
        props: ({mutate}) => ({
            createImage: data => mutate({
                variables: {data},
            }),
        }),
    }),
    graphql(CreateVideoMutation, {
        props: ({mutate}) => ({
            createVideo: data => mutate({
                variables: {data},
            }),
        }),
    })
)(Component)
