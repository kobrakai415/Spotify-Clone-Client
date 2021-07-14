import React from 'react';
import { addAlbumToFavourites, removeAlbumFromFavourites, playPause, addTrackToFavourites, removeTrackFromFavourites, setCurrentSong } from "../redux/actions"
import { Row, Col } from 'react-bootstrap';
import { CgPlayButton } from "react-icons/cg"
import { BiPause } from "react-icons/bi"
import { connect } from "react-redux"
import LikedSongsListItem from '../components/LikedSongsListItem';

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    favouriteAlbum: (album) => dispatch(addAlbumToFavourites(album)),
    unFavouriteAlbum: (album) => dispatch(removeAlbumFromFavourites(album)),
    playPause: () => { dispatch(playPause()) },
    favouriteTrack: (track) => { dispatch(addTrackToFavourites(track)) },
    unFavouriteTrack: (track) => { dispatch(removeTrackFromFavourites(track)) },
    setPlaying: (track) => { dispatch(setCurrentSong(track)) }

})


const LikedSongsPage = ({ media, favourites, playPause, setPlaying, }) => {

    const playlistPlayHandler = () => {
        if (favourites.tracks[0]) {
            const songToPlay = favourites.tracks[0]
            setPlaying(songToPlay)
            playPause()
        }

    }
    

    return (
        <Col className="main-page main-page-mobile p-0" xs={12} md={9} lg={10}>
            <Row className="mx-0 fade-bg">
                <Col md={12}>


                    <Row className="mt-5">
                        <Col className="d-flex justify-content-center" xs={12} md={4}>

                            <img className="shadow-lg pl-3" height="190px" src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" alt="playlist-cover" />
                        </Col>
                        <Col className="pt-5 text-center" xs={12} md={8}>
                            <span >PLAYLIST</span>
                            <h1>Liked Songs</h1>

                            <div>
                                <strong>kaiwankadir • </strong>
                                <span>{favourites.tracks.length > 0 ? favourites.tracks.length + " songs" : ""} </span>
                            </div>
                        </Col>
                    </Row>



                    <Col className="p-1 p-md-5 mt-5">

                        <Row className="pb-3">
                            <Col xs={12}>

                                {!media.play && <CgPlayButton onClick={playlistPlayHandler} className="me-4" style={{ fontSize: "55px", backgroundColor: "1db954", borderRadius: "50%" }} />}
                                {media.play && <BiPause onClick={playPause} className="me-4" style={{ fontSize: "55px", backgroundColor: "1db954", borderRadius: "50%" }} />}


                            </Col>
                        </Row>

                        <Row className="mx-0 p-2">

                            <div className="text-muted col-2 col-md-1">#</div>
                            <div className="text-muted col-7 col-md-8 col-lg-5">TITLE</div>
                            <div className="text-muted d-none d-lg-block col-lg-4">ALBUM</div>
                            {/* <div className="text-muted d-none d-md-block col-md-4 col-lg-2">DATE ADDED</div> */}

                            <div className="col-3 col-md-3 col-lg-2" >
                                <svg className="text-muted mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M7.999 3H6.999V7V8H7.999H9.999V7H7.999V3ZM7.5 0C3.358 0 0 3.358 0 7.5C0 11.642 3.358 15 7.5 15C11.642 15 15 11.642 15 7.5C15 3.358 11.642 0 7.5 0ZM7.5 14C3.916 14 1 11.084 1 7.5C1 3.916 3.916 1 7.5 1C11.084 1 14 3.916 14 7.5C14 11.084 11.084 14 7.5 14Z" fill="currentColor">
                                    </path></svg>
                            </div>
                        </Row>

                        <hr className="my-0 mb-2"></hr>
                        {favourites.tracks.length > 0 && <>

                            {favourites.tracks.map((track, index) => {

                                return <LikedSongsListItem key={index} song={track} index={index} />
                            })}


                        </>}

                    </Col>

                </Col>
            </Row>
        </Col>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LikedSongsPage);
