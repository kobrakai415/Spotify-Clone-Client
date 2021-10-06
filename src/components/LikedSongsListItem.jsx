import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from "react-bootstrap"
import dateDiff from "../helpers/datediff"
import { durationCalculator } from '../helpers/duration';
import { BsPlayFill, BsFillPauseFill } from "react-icons/bs"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { addTrackToFavourites, playPause, removeTrackFromFavourites, setCurrentSong, setQueue } from '../redux/actions';

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    favourite: (track) => { dispatch(addTrackToFavourites(track)) },
    unFavourite: (track) => { dispatch(removeTrackFromFavourites(track)) },
    setPlaying: (track) => { dispatch(setCurrentSong(track)) },
    playPause: () => { dispatch(playPause()) },
    setQueue: (tracks) => { dispatch(setQueue(tracks)) }
})

const LikedSongsListItem = ({ song, index, favourites, favourite, unFavourite, setPlaying, media, playPause, setQueue }) => {

    const [previewAvailable, setPreviewAvailable] = useState(true)
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);

    const playHandler = () => {

        if (!song.preview_url) {
            setPreviewAvailable(false)
            setShow(true)
        } else {

            setPlaying({ ...song });
            if (!media.play) { playPause(); }
        }
    }

    useEffect(() => {

        setQueue(favourites.tracks)
    }, [])

    return (

        <div className="row mx-0 d-flex align-items-center playlist-item p-2 playlist-item-name">
            <div className="col-2 col-md-1" >{index + 1}</div>

            <div className="col-7 pe-2 col-md-8 col-lg-5 d-flex align-items-center">
                <div>

                    {!media.play && <BsPlayFill className="me-2" style={{ fontSize: "20px" }} onClick={playHandler} />}

                    {media.play && media.selectedSong.id === song.id && <BsFillPauseFill className="me-2" style={{ fontSize: "20px" }} onClick={playPause} />}

                    {media.play && media.selectedSong.id !== song.id && <BsPlayFill className="me-2" style={{ fontSize: "20px" }} onClick={playHandler} />}
                </div>

                <img height="25px" src={song?.album.images[2]?.url} alt="song-cover" />

                <div className="ps-3 d-flex flex-column text-truncate">
                    <span className="text-truncate"> {song?.name}</span>
                    <span className="text-truncate text-muted">{song?.artists[0].name}</span>
                </div>


            </div>

            <div className="d-none d-lg-block col-lg-4 text-truncate">{song?.album.name}</div>
            {/* <div className="d-none d-md-block col-md-4 col-lg-2">{dateDiff(song.added_at)}</div> */}
            <div className="col-3 col-md-3 col-lg-2 d-flex align-items-center">
                {favourites.tracks.find(item => item?.id === song?.id) ? <AiFillHeart className="me-2" style={{ fontSize: "20px", color: "1db954" }} onClick={() => { unFavourite(song); }} />
                    : <AiOutlineHeart className="me-2" style={{ fontSize: "20px" }} onClick={() => { favourite(song); }} />}
                {durationCalculator(song.duration_ms)}

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

export default connect(mapStateToProps, mapDispatchToProps)(LikedSongsListItem);
