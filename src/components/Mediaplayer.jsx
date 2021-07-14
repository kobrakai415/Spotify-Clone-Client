import { useState, useEffect, createRef } from "react"
import { Col, ProgressBar, Modal, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { addTrackToFavourites, playPause, removeTrackFromFavourites, setCurrentSong } from '../redux/actions';
import { durationCalculator, formatTime } from "../helpers/duration";

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    playPause: () => dispatch(playPause()),
    favourite: (track) => dispatch(addTrackToFavourites(track)),
    unFavourite: (track) => dispatch(removeTrackFromFavourites(track)),
    setPlaying: (track) => dispatch(setCurrentSong(track))
})

const Mediaplayer = ({ media, favourites, unFavourite, favourite, playPause, setPlaying }) => {

    const [volume, setVolume] = useState(10)
    const [currentTime, setCurrentTime] = useState(0)
    const [show, setShow] = useState(false)

    const audioRef = createRef()

    const handleClose = () => setShow(false);

    const nextSong = () => {
        const index = media.queue.findIndex(x => x.track.id === media.selectedSong.id)

        console.log(index)
        const songToSkipTo = media.queue[index === media.queue.length - 1 ? 0 : index + 1]

        if (songToSkipTo.track.preview_url === null) {
            setShow(true)

        } else {
            setPlaying(songToSkipTo.track)

            if (!media.play) {
                playPause()
            }
        }
    }

    const prevSong = () => {
        const index = media.queue.findIndex(x => x.track.id === media.selectedSong.id)

        const songToSkipTo = media.queue[index === 0 ? media.queue.length - 1 : index - 1]

        if (songToSkipTo.track.preview_url === null) {
            setShow(true)

        } else {
            setPlaying(songToSkipTo.track)

            if (!media.play) {
                playPause()
            }
        }
    }

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        media.play ? audio.play() : audio.pause()
    }, [media.selectedSong, media.play])

    useEffect(() => {
        const audio = audioRef.current
        audio.volume = volume / 100
        console.log(audio.currentTime)
    }, [volume])

    useEffect(() => {
        const audio = audioRef.current
        audio.addEventListener("timeupdate", (event) => {
            setCurrentTime(event.currentTarget.currentTime);
        });
        audio.addEventListener("ended", (event) => {
            playPause()
        });
    }, [])


    return (
        <>
            <Col xs={8} md={4} className="media-left d-flex align-items-center text-truncate">

                <img height="40px" width="40px" src={media.selectedSong.album?.images[2].url || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"} alt="song-cover" />

                <div className="d-flex flex-column ms-3 text-truncate">
                    <span className="text-truncate">{media.selectedSong?.name}</span>
                    <small className="text-truncate text-muted">{media.selectedSong?.artists[0]?.name}</small>
                </div>
                <div className="d-flex justify-content-end px-3">
                    {favourites.tracks.some(item => item?.id == media.selectedSong?.id) ? <AiFillHeart className="m-2" style={{ fontSize: "16px", color: "1db954" }} onClick={() => { unFavourite(media.selectedSong); }} />
                        : <AiOutlineHeart className="m-2" style={{ fontSize: "16px" }} onClick={() => { favourite(media.selectedSong); }} />}

                    <svg className="d-none d-sm-flex m-2" role="img" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="evenodd"><path d="M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" fillRule="nonzero"></path><path d="M10 8h4v3h-4z"></path></g></svg>
                </div>

            </Col>

            <Col xs={4} md={5} className="d-flex flex-column media-mid">
                <div className="d-flex align-items-center m-auto">
                    <svg role="img" height="16" width="16" viewBox="0 0 16 16" className="d-none d-md-flex mx-3 Svg-ulyrgf-0 cMigZB"><path fill="currentcolor" d="M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z"></path></svg>
                    <svg onClick={prevSong} role="img" height="16" width="16" viewBox="0 0 16 16" className="d-none d-md-flex mx-3 Svg-ulyrgf-0 cMigZB"><path fill="currentcolor" d="M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z"></path></svg>
                    <div id="play-button" className="d-flex justify-content-center align-items-center">

                        {!media.play && <svg id="play" onClick={() => playPause()} role="img" height="16" width="16" viewBox="0 0 16 16" className="Svg-ulyrgf-0 cMigZB">
                            <path fill="black" d="M4.018 14L14.41 8 4.018 2z"></path>
                        </svg>}

                        {media.play && <svg id="pause" onClick={() => playPause()} role="img" height="16" width="16" viewBox="0 0 16 16" className="Svg-sc__sc-1bi12j5-0 hPiOwj">
                            <path fill="none" d="M0 0h16v16H0z"></path>
                            <path d="M3 2h3v12H3zm7 0h3v12h-3z"></path>
                        </svg>}


                    </div>

                    <svg onClick={nextSong} role="img" height="16" width="16" viewBox="0 0 16 16" className="d-none d-md-flex mx-3 Svg-ulyrgf-0 cMigZB"><path fill="currentcolor" d="M11 3v4.119L3 2.5v11l8-4.619V13h2V3z"></path></svg>
                    <svg role="img" height="16" width="16" viewBox="0 0 16 16" className="d-none d-md-flex mx-3 Svg-ulyrgf-0 cMigZB"><path fill="currentcolor" d="M5.5 5H10v1.5l3.5-2-3.5-2V4H5.5C3 4 1 6 1 8.5c0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.6 3.6 5 5.5 5zm9.1 1.7l-.9.5c.2.4.3.8.3 1.3 0 1.9-1.6 3.5-3.5 3.5H6v-1.5l-3.5 2 3.5 2V13h4.5C13 13 15 11 15 8.5c0-.6-.1-1.2-.4-1.8z"></path></svg>

                </div>

                <div className="align-items-center d-none d-sm-flex">
                    <span className="currentTime">
                        {formatTime(currentTime)
                            || "0:00"}
                    </span>

                    <ProgressBar className="mx-3 " style={{ width: "90%", height: "4px" }} variant="primary" now={currentTime * 3.33} >
                    </ProgressBar>
                    <audio id="audio" src={media.selectedSong.preview_url || null} ref={audioRef}>
                    </audio>
                    <span className="duration ">{durationCalculator(media.selectedSong.duration_ms)}</span>
                </div>

            </Col>

            <Col md={3} className="d-none d-md-flex media-right justify-content-end align-items-center">
                <div className="p-2">
                    <svg role="presentation" height="16" width="16" aria-label="Volume high" id="volume-icon" viewBox="0 0 16 16" className="Svg-ulyrgf-0 cMigZB"><path fill="currentcolor" d="M12.945 1.379l-.652.763c1.577 1.462 2.57 3.544 2.57 5.858s-.994 4.396-2.57 5.858l.651.763a8.966 8.966 0 00.001-13.242zm-2.272 2.66l-.651.763a4.484 4.484 0 01-.001 6.397l.651.763c1.04-1 1.691-2.404 1.691-3.961s-.65-2.962-1.69-3.962zM0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732z"></path></svg>
                </div>
                <input value={volume} onChange={(e) => setVolume(e.target.value)} className="volume-slider" type="range" style={{ height: "2px", backgroundColor: "#198754" }} />
            </Col>

            {show &&

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

        </>



    )

}


export default connect(mapStateToProps, mapDispatchToProps)(Mediaplayer)