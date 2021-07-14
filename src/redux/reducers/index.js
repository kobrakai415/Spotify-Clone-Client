import { initialState } from "../store"

export const favouritesReducer = (state = initialState.favourites, action) => {

    switch (action.type) {
        case "ADD_TRACK_TO_FAVOURITES":
            return {
                ...state,
                tracks: [...state.tracks, action.payload]
            }
        case "REMOVE_TRACK_FROM_FAVOURITES":
            const modifiedTracks = [...state.tracks.filter(track => track.id !== action.payload.id)]
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
            const modifiedAlbums = [...state.albums.filter(album => album.id !== action.payload.id)]
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
        case "ADD_ARTIST_TO_FAVOURITES":
            return {
                ...state,
                artists: [...state.artists, action.payload]
            }
        case "REMOVE_ARTIST_FROM_FAVOURITES":
            const modifiedArtists = [...state.artists.filter(artist => artist.id !== action.payload.id)]
            return {
                ...state,
                artists: modifiedArtists
            }
        default:
            return state

    }
}

export const mediaReducer = (state = initialState.media, action) => {

    switch (action.type) {
        case "SET_CURRENT_SONG":
            return {
                ...state,
                selectedSong: { ...action.payload }
            }

        case "PLAY_PAUSE":
            return {
                ...state,
                play: !state.play
            }
        case "SET_QUEUE":
            return {
                ...state,
                queue: [...action.payload]
            }

        default:
            return state

    }
}

export const dataReducer = (state = initialState.data, action) => {

    switch (action.type) {
        case 'SET_PLAYLIST_DATA':
            return {
                ...state,
                playlistData: { ...action.payload }
            }
        case 'SET_BROWSE_ALL_DATA':
            return {
                ...state,
                browseAllData: [...action.payload]
            }
        case 'SET_ALBUM_INFO':
            return {
                ...state,
                albumInfo: { ...action.payload }
            }
        case 'SET_ALBUM_DATA':
            return {
                ...state,
                albumData: [ ...action.payload]
            }

        default:
            return state
    }
}
