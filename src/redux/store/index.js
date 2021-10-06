import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { favouritesReducer, mediaReducer, dataReducer } from "../reducers"
import thunk from "redux-thunk"
import initialSong from "../initialSong.json"
import initialQueue from "../initialQueue.json"

export const initialState = {

    favourites: {
        tracks: [],
        albums: [],
        playlists: [],
        artists: []

    },
    media: {
        selectedSong: initialSong,
        queue: initialQueue,
        play: false,

    },
    data: {
        loading: false,
        playlistData: null,
        browseAllData: null,
        albumInfo: null,
        albumData: [],
        topTracks: [],
        
        
    }
}

const mainReducer = combineReducers(
    {
        favourites: favouritesReducer,
        media: mediaReducer,
        data: dataReducer
    }
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => createStore(mainReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

export default configureStore