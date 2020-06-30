import {
    FETCH_NEWS
} from "./actionTypes"

export default (state = {}, action) => {

    switch (action.type) {
        case FETCH_NEWS:
            return {
                ...state,
                news: action.payload,
                refreshing: false
            }
        case 'REFRESHING_TRUE':
            return {
                ...state,
                refreshing: true
            }
        case 'REFRESHING_FALSE':
            return {
                ...state,
                refreshing: false
            }
        default:
            return state
    }
} 