import React, { useState } from 'react';
import dateDiff from "../helpers/datediff"
import { durationCalculator } from '../helpers/duration';
import { BsPlayFill, BsFillPauseFill } from "react-icons/bs"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { connect } from "react-redux"
import { addTrackToFavourites, playPause, removeTrackFromFavourites, setCurrentSong } from '../redux/actions';
import { Modal, Button } from "react-bootstrap"
import record from "../assets/record.jpg"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    favourite: (track) => { dispatch(addTrackToFavourites(track)) },
    unFavourite: (track) => { dispatch(removeTrackFromFavourites(track)) },
    setPlaying: (track) => { dispatch(setCurrentSong(track)) },
    playPause: () => { dispatch(playPause()) }
})

const PlaylistItem = ({ song, index, favourites, favourite, unFavourite, setPlaying, media, playPause }) => {

    const [previewAvailable, setPreviewAvailable] = useState(true)
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);

    const playHandler = () => {

        if (!song.track.preview_url) {
            setPreviewAvailable(false)
            setShow(true)
        } else {

            setPlaying({ ...song.track });
            if (!media.play) { playPause(); }
        }

    }

    return (
        <div className="row mx-0 d-flex align-items-center playlist-item p-2 playlist-item-name">
            <div className="col-2 col-md-1" >{index + 1}</div>

            <div className="col-7 pe-2 col-md-5 col-lg-4 d-flex align-items-center">
                <div>

                    {!media.play && <BsPlayFill className="me-2" style={{ fontSize: "20px" }} onClick={playHandler} />}

                    {media.play && media.selectedSong.id === song.track?.id && <BsFillPauseFill className="me-2" style={{ fontSize: "20px" }} onClick={() => playPause()} />}

                    {media.play && media.selectedSong.id !== song.track?.id && <BsPlayFill className="me-2" style={{ fontSize: "20px" }} onClick={playHandler} />}
                </div>

                <img height="35px" src={song.track?.album.images[2]?.url || record} alt="song-cover" />

                <div className="ps-3 d-flex flex-column text-truncate">
                    <span className="text-truncate"> {song.track?.name}</span>
                    <span className="text-truncate text-muted">{song.track?.artists[0]?.name}</span>
                </div>


            </div>

            <div className="d-none d-lg-block col-lg-3 text-truncate">{song.track?.album?.name}</div>
            <div className="d-none d-md-block col-md-4 col-lg-2">{dateDiff(song.added_at)}</div>
            <div className="col-3 col-md-2 col-lg-2 d-flex align-items-center">
                {favourites.tracks.find(item => item?.id === song.track?.id) ? <AiFillHeart className="me-2" style={{ fontSize: "20px", color: "1db954" }} onClick={() => { unFavourite(song.track); }} />
                    : <AiOutlineHeart className="me-2" style={{ fontSize: "20px" }} onClick={() => { favourite(song.track); }} />}
                {durationCalculator(song.track?.duration_ms)}
            </div>


            {!previewAvailable &&

                <Modal style={{ color: "black" }} show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>We are sorry!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Spotify Unfortunately does not provide a previewUrl for this track.
                        Please try another album, track or playlist!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>}


        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);
