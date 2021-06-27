import { initialState } from "../store"


export const favouritesReducer = (state = initialState.favourites, action) => {

    switch (action.type) {
        case "ADD_TRACK_TO_FAVOURITES":
            return {
                ...state,
                tracks: [...state.tracks, action.payload]
            }
        case "REMOVE_TRACK_FROM_FAVOURITES":
            const modifiedTracks = [...state.tracks.filter(track => track.track.id !== action.payload.track.id)]
            return {
                ...state,
                tracks: modifiedTracks
            }
        case "ADD_ALBUM_TO_FAVOURITES":
            return {
                ...state,
                albums: [...state.albums, action.payload]
            }
        case "REMOVE_ALBUM_FROM_FAVOURITES":
            const modifiedAlbums = [...state.albums.filter(album => album.album.id !== action.payload.album.id)]
            return {
                ...state,
                albums: modifiedAlbums
            }
        case "ADD_PLAYLIST_TO_FAVOURITES":
            return {
                ...state,
                playlists: [...state.playlists, action.payload]
            }
        case "REMOVE_PLAYLIST_FROM_FAVOURITES":
            const modifiedPlaylists = [...state.playlists.filter(playlist => playlist.id !== action.payload.id)]
            return {
                ...state,
                playlists: modifiedPlaylists
            }
        default:
            return state

    }
}



export const currentSongReducer = (state = initialState.currentsong, action) => {

    switch (action.type) {
        case "SET_CURRENT_SONG":
            return {
                ...state,
                playingNow: { ...action.payload }
            }
        default:
            return state

    }
}

