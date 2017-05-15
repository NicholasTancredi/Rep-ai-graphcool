import UserTrainingPortalComponent from './UserTrainingPortalComponent'
import SearchComponent from './SearchComponent'
import ExerciseDisplay from './ExerciseDisplay'
import EditUserProfileComponent from './EditUserProfileComponent'
import SessionComponent from './Session'
import ChatComponent from './ChatComponent'
import FollowPageComponent from './FollowPageComponent'
import VideoPlayer from './VideoPlayer'

import SessionDisplay from './Session/display'

import {
    ExerciseCameraComponent,
    FullImageComponent,
    CreateExerciseComponentScreen,
    VideoPlayerComponent,
} from './CreateExerciseComponent'

export default {
    Profile: {
        screen: UserTrainingPortalComponent,
    },

    EditUserProfileComponent: {
        screen: EditUserProfileComponent,
    },

    SessionComponent: {
        screen: SessionComponent,
    },

    SessionDisplay: {
        screen: SessionDisplay,
    },

    Search: {
        screen: SearchComponent,
    },

    TrainingPortalComponent: {
        screen: () => null,
    },

    Chat: {
        screen: ChatComponent,
    },

    Events: {
        screen: () => null,
    },

    Followers: {
        screen: FollowPageComponent,
    },

    Create: {
        screen: ExerciseCameraComponent,
        navigationOptions: {
            headerMode: 'none',
            header: {
                visible: false,
                style: {
                    position: 'absolute',
                    height: 0,
                },
            },
        }
    },

    FullImageComponent: {
        screen: FullImageComponent,
    },

    CreateExerciseComponent: {
        screen: CreateExerciseComponentScreen,
    },

    VideoPlayer: {
        screen: VideoPlayer,
    },

    VideoPlayerComponent: {
        screen: VideoPlayerComponent,
    },

    ExerciseDisplay: {
        screen: ExerciseDisplay,
    }
}
