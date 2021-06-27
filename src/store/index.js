import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { favouritesReducer, currentSongReducer } from "../reducers"
import thunk from "redux-thunk"

export const initialState = {

    favourites: {
        tracks: [],
        albums: [],
        playlists: []
    },
    currentsong: {
        playingNow: {},
        queue: [],
    }
}

const mainReducer = combineReducers(
    {
        favourites: favouritesReducer,
        currentSong: currentSongReducer
    }
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => createStore(mainReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

export default configureStore