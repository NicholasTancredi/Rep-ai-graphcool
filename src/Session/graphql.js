import { gql, graphql } from 'react-apollo'

export const getSession = sessionId => graphql(gql `
    query {
        getSession(id: "${sessionId}") {
            title
            description
            exercises {
                edges {
                    node {
                        id
                        title
                        reps
                        sets
                    }
                }
            }
        }
    }
`)

const CreateSessionMutation = gql `
    mutation CreateSessionMutation($data: CreateSessionInput!) {
        createSession(input: $data) {
            changedSession {
                id
            }
        }
    }
`

export const createSession = graphql(CreateSessionMutation, {
    props: ({mutate}) => ({
        createSession: ({
            title,
            creatorId,
            description,
        }) => mutate({variables: {
            data: {
                title,
                creatorId,
                description,
            }
        }})
    })
})


const UpdateSessionMutation = gql `
    mutation UpdateSessionMutation($data: UpdateSessionInput!) {
        updateSession(input: $data) {
            changedSession {
                id
            }
        }
    }
`

export const updateSession = graphql(UpdateSessionMutation, {
    props: ({mutate}) => ({
        updateSession: ({
            title,
            description,
            creatorId
        }) => mutate({variables: {
            data: {
                description,
                title,
                creatorId,
            }
        }})
    })
})

const DeleteSessionMutation = gql `
    mutation DeleteSessionMutation($data: DeleteSessionInput!) {
        deleteSession(input: $data) {
            changedSession {
                id
            }
        }
    }
`

export const deleteSession = graphql(DeleteSessionMutation, {
    props: ({mutate}) => ({
        deleteSession: ({
            id
        }) => mutate({variables: {
            data: {
                id
            }
        }})
    })
})


const AddToSessionExerciseConnectionMutation = gql `
    mutation AddToFollowingUserConnectionConnectionMutation(
        $data: AddToFollowingUserConnectionConnectionInput!
    ) {
        addToFollowingUserConnectionConnection(input: $data) {
            changedFollowingUserConnection {
                createdAt
            }
        }
    }
`

export const addToSessionExerciseConnection = graphql(
    AddToSessionExerciseConnectionMutation, {
    props: ({mutate}) => ({
        addToSessionExerciseConnection: ({
            exerciseId,
            sessionId,
        }) => mutate({variables: {
            data: {
                exerciseId,
                sessionId,
            }
        }})
    })
})

const UpdateSessionExerciseConnectionMutation = gql `
    mutation UpdateSessionExerciseConnectionMutation(
        $data: UpdateSessionExerciseConnectionInput!
    ) {
        updateSessionExerciseConnection(input: $data) {
            changedSessionExercise {
                createdAt
            }
        }
    }
`

export const updateSessionExerciseConnection = graphql(
    UpdateSessionExerciseConnectionMutation, {
    props: ({mutate}) => ({
        updateSessionExerciseConnection: ({
            exerciseId,
            sessionId,
        }) => mutate({variables: {
            data: {
                exerciseId,
                sessionId,
            }
        }})
    })
})

const RemoveSessionExerciseConnectionMutation = gql `
    mutation RemoveSessionExerciseConnectionMutation(
        $data: RemoveSessionExerciseConnectionInput!
    ) {
        removeSessionExerciseConnection(input: $data) {
            changedSessionExercise {
                createdAt
            }
        }
    }
`

export const removeSessionExerciseConnection = graphql(
    RemoveSessionExerciseConnectionMutation, {
    props: ({mutate}) => ({
        removeSessionExerciseConnection: ({
            exerciseId,
            sessionId,
        }) => mutate({variables: {
            data: {
                exerciseId,
                sessionId,
            }
        }})
    })
})



export const AddToSessionsUsersConnectionMutation = gql `
    mutation AddToSessionsUsersConnectionMutation(
        $data: AddToSessionsUsersConnectionInput!
    ) {
        addToSessionsUsersConnection(input: $data) {
            changedSessionsUsers {
                createdAt
            }
        }
    }
`

export const addToSessionsUsersConnection = graphql(
    AddToSessionsUsersConnectionMutation, {
    props: ({mutate}) => ({
        addToSessionsUsersConnection: ({
            userId,
            sessionId,
        }) => mutate({variables: {
            data: {
                userId,
                sessionId,
            }
        }})
    })
})

export const UpdateSessionsUsersConnectionMutation = gql `
    mutation UpdateSessionsUsersConnectionMutation(
        $data: UpdateSessionsUsersConnectionInput!
    ) {
        updateSessionsUsersConnection(input: $data) {
            changedSessionsUsers {
                createdAt
            }
        }
    }
`
export const updateSessionsUsersConnection = graphql(
    UpdateSessionsUsersConnectionMutation, {
    props: ({mutate}) => ({
        updateSessionsUsersConnection: ({
            userId,
            sessionId,
        }) => mutate({variables: {
            data: {
                userId,
                sessionId,
            }
        }})
    })
})

export const RemoveSessionsUsersConnectionMutation = gql `
    mutation RemoveSessionsUsersConnectionMutation(
        $data: RemoveSessionsUsersConnectionInput!
    ) {
        removeSessionsUsersConnection(input: $data) {
            changedSessionsUsers {
                createdAt
            }
        }
    }
`

export const removeSessionsUsersConnection = graphql(
    RemoveSessionsUsersConnectionMutation, {
    props: ({mutate}) => ({
        removeSessionsUsersConnection: ({
            userId,
            sessionId,
        }) => mutate({variables: {
            data: {
                userId,
                sessionId,
            }
        }})
    })
})

export default [
    createSession,
    updateSession,
    deleteSession,
    addToSessionExerciseConnection,
    updateSessionExerciseConnection,
    removeSessionExerciseConnection,
    addToSessionsUsersConnection,
    updateSessionsUsersConnection,
    removeSessionsUsersConnection
]
