import {
    GET_USERS,
    GET_PHOTOS,
    FETCH_STARTED,
    FETCH_FAILURE,
    FETCH_SUCCESS
} from './actions'

const initialState = {
    isLoading: false,
    users: [],
    photos: [],
    errors: {}
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.users,
            };
    
        case GET_PHOTOS:
            return {
                ...state,
                photos: action.photos,
            };

        case FETCH_STARTED:
            return {
                ...state,
                isLoading: true,
            };

        case FETCH_FAILURE:
            return {
                ...state,
                errors: {...state.errors, [action.name]: action.error} 
            };

        case FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
}