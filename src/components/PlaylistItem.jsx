import React, { useState } from 'react';
import dateDiff from "../helpers/datediff"
import { durationCalculator } from '../helpers/duration';
import { BsPlayFill, BsFillPauseFill } from "react-icons/bs"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { connect } from "react-redux"
import { addTrackToFavourites, removeTrackFromFavourites, setCurrentSong } from '../actions';

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    favourite: (track) => { dispatch(addTrackToFavourites(track)) },
    unFavourite: (track) => { dispatch(removeTrackFromFavourites(track)) },
    playSong: (track) => {dispatch(setCurrentSong(track))}
})

const PlaylistItem = ({ song, index, favourite, unFavourite, playSong }) => {
    const [play, setPlay] = useState(false)
    const [liked, setLiked] = useState(false)

    return (
        <div key={song.id} className="row mx-0 playlist-item p-2">
            <div className="col-2 col-md-1" >{index + 1}</div>

            <div className="col-7 col-md-5 col-lg-4 text-truncate">
                {play && <BsFillPauseFill className="me-2" style={{ fontSize: "20px" }} onClick={() => { playSong(song); setPlay(false)}} />}
                {!play && <BsPlayFill className="me-2" style={{ fontSize: "20px" }} onClick={() => setPlay(true)} />}
                <img height="35px" src={song.track.album.images[2].url} alt="song-cover" /> {song.track.name}
            </div>

            <div className="d-none d-lg-block col-lg-4 text-truncate">{song.track.album.name}</div>
            <div className="d-none d-md-block col-md-4 col-lg-2">{dateDiff(song.added_at)}</div>
            <div className="col-3 col-md-2 col-lg-1">
                {liked && <AiFillHeart className="me-2" style={{ fontSize: "20px", color: "1db954" }} onClick={() => {unFavourite(song); setLiked(false)}} />}
                {!liked && <AiOutlineHeart className="me-2" style={{ fontSize: "20px" }} onClick={() => { favourite(song); setLiked(true) }} />}
                {durationCalculator(song.track.duration_ms)}
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);
