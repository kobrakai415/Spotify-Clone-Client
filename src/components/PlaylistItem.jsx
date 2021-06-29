import React, { useState } from 'react';
import dateDiff from "../helpers/datediff"
import { durationCalculator } from '../helpers/duration';
import { BsPlayFill, BsFillPauseFill } from "react-icons/bs"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { connect } from "react-redux"
import { addTrackToFavourites, playPause, removeTrackFromFavourites, setCurrentSong } from '../redux/actions';


const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    favourite: (track) => { dispatch(addTrackToFavourites(track)) },
    unFavourite: (track) => { dispatch(removeTrackFromFavourites(track)) },
    setPLaying: (track) => { dispatch(setCurrentSong(track)) },
    playPause: () => { dispatch(playPause()) }
})

const PlaylistItem = ({ song, index, favourites, favourite, unFavourite, setPLaying, media, playPause }) => {
    const [play, setPlay] = useState(false)
    const [liked, setLiked] = useState(false)


    return (
        <div id={song.id} className="row mx-0 playlist-item p-2 playlist-item-name">
            <div className="col-2 col-md-1" >{index + 1}</div>

            <div className="col-7 pe-2 col-md-5 col-lg-4 d-flex align-items-center">
                <div>

                {!media.play && <BsPlayFill className="me-2" style={{ fontSize: "20px" }} onClick={() => { setPLaying(song); playPause(); setPlay(true) }} />}

                {media.play && media.selectedSong.track.id === song.track.id && <BsFillPauseFill className="me-2" style={{ fontSize: "20px" }} onClick={() => { playPause() }} />}

                {media.play && media.selectedSong.track.id !== song.track.id && <BsPlayFill className="me-2" style={{ fontSize: "20px" }} onClick={() => { setPLaying(song); setPlay(true) }} />}
                </div>

                <img height="35px" src={song.track?.album.images[2]?.url} alt="song-cover" />

                <div className="ps-3 d-flex playlist-item-name flex-column text-truncate">
                    <span className="text-truncate"> {song.track?.name}</span>
                    <span className="text-truncate text-muted">{song.track?.artists[0].name}</span>
                </div>


            </div>

            <div className="d-none d-lg-block col-lg-3 text-truncate">{song.track?.album.name}</div>
            <div className="d-none d-md-block col-md-4 col-lg-2">{dateDiff(song.added_at)}</div>
            <div className="col-3 col-md-2 col-lg-2">
                {favourites.tracks.find(item => item.track?.id === song.track?.id) ? <AiFillHeart className="me-2" style={{ fontSize: "20px", color: "1db954" }} onClick={() => { unFavourite(song);}} />
                : <AiOutlineHeart className="me-2" style={{ fontSize: "20px" }} onClick={() => { favourite(song); }} />}
                {durationCalculator(song.track?.duration_ms)}
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);
