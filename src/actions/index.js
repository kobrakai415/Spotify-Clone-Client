const ApiUrl = process.env.REACT_APP_API_URL


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

export const setCurrentSong = (track) => ({
  type: 'SET_CURRENT_SONG',
  payload: track,
})


export const getVacancies = (query) => {
  return async (dispatch, getState,) => {
    try {

      if (query) {
        dispatch({
          type: "SET_LOADING",
          payload: true
        })
        const res = await fetch(`${ApiUrl}?search=${query}`)
        const json = await res.json()
        console.log(json)

        dispatch({
          type: "SET_VACANCIES",
          payload: json.jobs
        })
        dispatch({
          type: "SET_LOADING",
          payload: false
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}