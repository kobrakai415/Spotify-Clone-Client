import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { favouritesReducer, mediaReducer } from "../reducers"
import thunk from "redux-thunk"
import initialSong from "../initialSong.json"

export const initialState = {

    favourites: {
        tracks: [],
        albums: [],
        playlists: []
    },
    media: {
        selectedSong: initialSong,
        queue: [],
        play: false,
    }
}

const mainReducer = combineReducers(
    {
        favourites: favouritesReducer,
        media: mediaReducer
    }
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => createStore(mainReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

export default configureStore