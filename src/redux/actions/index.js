const ApiUrl = process.env.REACT_APP_SPOTIFY_API

export const addTrackToFavourites = (track) => ({
  type: 'ADD_TRACK_TO_FAVOURITES',
  payload: track,
})

export const removeTrackFromFavourites = (track) => ({
  type: 'REMOVE_TRACK_FROM_FAVOURITES',
  payload: track,
})

export const addPlaylistToFavourites = (playlist) => ({
  type: 'ADD_PLAYLIST_TO_FAVOURITES',
  payload: playlist,
})

export const removePlaylistFromFavourites = (playlist) => ({
  type: 'REMOVE_PLAYLIST_FROM_FAVOURITES',
  payload: playlist,
})

export const addAlbumToFavourites = (album) => ({
  type: 'ADD_ALBUM_TO_FAVOURITES',
  payload: album,
})

export const removeAlbumFromFavourites = (album) => ({
  type: 'REMOVE_ALBUM_FROM_FAVOURITES',
  payload: album,
})

export const addArtistToFavourites = (artist) => ({
  type: 'ADD_ARTIST_TO_FAVOURITES',
  payload: artist,
})

export const removeArtistFromFavourites = (artist) => ({
  type: 'REMOVE_ARTIST_FROM_FAVOURITES',
  payload: artist,
})

export const setCurrentSong = (track) => ({
  type: 'SET_CURRENT_SONG',
  payload: track,
})

export const playPause = () => ({
  type: 'PLAY_PAUSE'
})

export const setQueue = (queuedTracks) => ({
  type: 'SET_QUEUE',
  payload: queuedTracks
})



export const toggleLoading = () => ({
  type: 'TOGGLE_LOADING'
})


export const setPlaylistData = (data) => ({
  type: 'SET_PLAYLIST_DATA',
  payload: data
})

export const setBrowseAllData = (data) => ({
  type: 'SET_BROWSE_ALL_DATA',
  payload: data
})

export const setAlbumInfo = (data) => ({
  type: 'SET_ALBUM_INFO',
  payload: data
})

export const setAlbumData = (data) => ({
  type: 'SET_ALBUM_DATA',
  payload: data
})



export const fetchPlaylistData = (id, token) => {
  return async (dispatch, getState) => {
    try {
      if (id) {

        const res = await fetch(`${ApiUrl}/playlists/${id}`, {
          headers: {
            "Authorization": "Bearer " + token
          }
        })

        if (res.ok) {
          const json = await res.json()
          console.log(json)

          dispatch(setPlaylistData(json))
          dispatch(setQueue(json.tracks.items))
        }
      }

    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchBrowseAll = (token) => {
  return async (dispatch) => {
    try {
      let response = await fetch(`${ApiUrl}/browse/categories?country=GB`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      })

      if (response.ok) {
        let json = await response.json()

        dispatch(setBrowseAllData(json.categories.items))
      }

    } catch (error) {
      console.log(error)
    }
  }

}

export const fetchAlbumData = (id, token) => {
  return async (dispatch) => {
    try {

      const res = await fetch(`${ApiUrl}/albums/${id}`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      const json = await res.json()

      dispatch(setAlbumInfo({ ...json }))
      dispatch(setAlbumData(json.tracks.items))

    } catch (error) {
      console.log(error)
    }
  }
}