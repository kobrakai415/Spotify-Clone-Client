import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { BsPlayFill, BsFillPauseFill } from "react-icons/bs"
import { durationCalculator } from '../helpers/duration';
import { connect } from 'react-redux';
import { playPause, addTrackToFavourites, removeTrackFromFavourites, setCurrentSong } from "../redux/actions"
import { Modal, Button } from 'react-bootstrap';

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    playPause: () => { dispatch(playPause()) },
    favouriteTrack: (track) => { dispatch(addTrackToFavourites(track)) },
    unFavouriteTrack: (track) => { dispatch(removeTrackFromFavourites(track)) },
    setPlaying: (track) => { dispatch(setCurrentSong(track)) }
})



const ArtistListItem = ({ song, index, media, favourites, playPause, setPlaying, favouriteTrack, unFavouriteTrack }) => {

    const [previewAvailable, setPreviewAvailable] = useState(true)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const playHandler = () => {

        if (!song.preview_url) {
            setPreviewAvailable(false)
            setShow(true)
        } else {

            setPlaying({ ...song });
            if(!media.play){ playPause();}
        }

    }

    return (

        <div key={index} className="row mx-0 d-flex align-items-center playlist-item-name p-2">
            <div className="col-2 col-md-1" >{index + 1}</div>

            <div className="col-7 col-md-9 d-flex align-items-center text-truncate playlist-item-name">
                <div>
                    {!media.play && <BsPlayFill className="me-2" style={{ fontSize: "20px" }} onClick={playHandler} />}

                    {media.play && media.selectedSong.id === song.id && <BsFillPauseFill className="me-2" style={{ fontSize: "20px" }} onClick={playHandler} />}

                    {media.play && media.selectedSong.id !== song.id && <BsPlayFill className="me-2" style={{ fontSize: "20px" }} onClick={playHandler} />}
                </div>

                <div className="d-flex flex-column">
                    <span className="text-truncate"> {song?.name}</span>
                </div>


            </div>

            <div className="col-3 col-md-2 d-flex align-items-center">
                {favourites.tracks.find(item => item?.id === song?.id) ? <AiFillHeart className="me-2" style={{ fontSize: "20px", color: "1db954" }} onClick={() => { unFavouriteTrack(song); }} />
                    : <AiOutlineHeart className="me-2" style={{ fontSize: "20px" }} onClick={() => { favouriteTrack(song); }} />}
                <span>
                    {durationCalculator(song.duration_ms)}
                </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ArtistListItem);
