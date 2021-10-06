import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Col, Row } from "react-bootstrap"
import PlaylistItem from '../components/PlaylistItem';
import { CgPlayButton } from "react-icons/cg"
import { IoMdHeart } from "react-icons/io"
import { BiPause } from "react-icons/bi"
import { connect } from 'react-redux';
import { addPlaylistToFavourites, removePlaylistFromFavourites, playPause, setQueue, fetchPlaylistData, setCurrentSong } from "../redux/actions/index.js"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    unFavourite: (playlist) => dispatch(removePlaylistFromFavourites(playlist)),
    favourite: (playlist) => dispatch(addPlaylistToFavourites(playlist)),
    playPause: () => dispatch(playPause()),
    setQueue: (list) => dispatch(setQueue(list)),
    fetch: (id, token) => dispatch(fetchPlaylistData(id, token)),
    setPlaying: (track) => dispatch(setCurrentSong(track))

})

const PlaylistPage = ({ token, unFavourite, favourite, media, playPause, favourites, fetch, data, setPlaying }) => {

    const playlistInfo = data.playlistData

    const playlistData = data.playlistData?.tracks.items

    const { id } = useParams()

    const playlistPlayHandler = () => {
        const songToPlay = playlistData.find(item => item.track?.preview_url !== null)

        if (songToPlay) {
            console.log(songToPlay)

            setPlaying(songToPlay.track)
            playPause()
        } else {
            return

        }
    }

    useEffect(async () => {
        fetch(id, token)


    }, [id])


    return (
        <Col className="main-page main-page-mobile p-0 " xs={12} md={9} lg={10}>
            <Row className="mx-0 fade-bg ">
                <Col md={12}>


                    {playlistInfo &&
                        <Row className="mt-5 ">
                            <Col className="d-flex justify-content-center" xs={12} md={4}>

                                <img className="shadow-lg " height="190px" src={playlistInfo.images[0]?.url} alt="playlist-cover" />
                            </Col>
                            <Col className="pt-5 text-center" xs={12} md={8}>

                                <h1>{playlistInfo.name}</h1>
                                <p>{playlistInfo.description}</p>
                                <div>
                                    <strong>Spotify • </strong>
                                    <span>{playlistInfo.followers.total.toLocaleString()} likes • </span>
                                    <span>{playlistInfo.tracks.items.length} {playlistInfo.tracks.items.length > 1 ? "songs" : "song"} </span>
                                </div>
                            </Col>
                        </Row>
                    }

                </Col>

                <Col xs={12} className="mt-5 p-3 p-md-5">
                    <Row className="pb-3">
                        <Col xs={12}>

                            {!media.play && <CgPlayButton onClick={playlistPlayHandler} className="me-4" style={{ fontSize: "55px", backgroundColor: "1db954", borderRadius: "50%" }} />}
                            {media.play && playlistData.some(item => item.track.id === media.selectedSong.id) &&
                                <BiPause onClick={playPause} className="me-4" style={{ fontSize: "55px", backgroundColor: "1db954", borderRadius: "50%" }} />}

                            {media.play && !playlistData.some(item => item.track.id === media.selectedSong.id) &&
                                <CgPlayButton onClick={() => { playlistPlayHandler(); playPause() }} className="me-4" style={{ fontSize: "55px", backgroundColor: "1db954", borderRadius: "50%" }} />}

                            {favourites.playlists.find(item => item.id === playlistInfo?.id) ? <IoMdHeart className="me-4" style={{ fontSize: "35px", color: "1db954" }} onClick={() => { unFavourite(playlistInfo) }} />
                                : <IoMdHeart className="me-4" style={{ fontSize: "35px", }} onClick={() => { favourite(playlistInfo); }} />}

                            <svg fill="grey" role="img" height="32" width="32" viewBox="0 0 32 32" className="Svg-sc__sc-1bi12j5-0 hPiOwj">
                                <path d="M5.998 13.999A2 2 0 105.999 18a2 2 0 00-.001-4zm10.001 0A2 2 0 1016 18a2 2 0 000-4zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z"></path>
                            </svg>
                        </Col>
                    </Row>

                    <Row className="mx-0 p-2 ">

                        <div className="text-muted col-2 col-md-1">#</div>
                        <div className="text-muted col-7 col-md-5 col-lg-4">TITLE</div>
                        <div className="text-muted d-none d-lg-block col-lg-3">ALBUM</div>
                        <div className="text-muted d-none d-md-block col-md-4 col-lg-2">DATE ADDED</div>

                        <div className="col-3 col-md-2 col-lg-2" >
                            <svg className="text-muted mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M7.999 3H6.999V7V8H7.999H9.999V7H7.999V3ZM7.5 0C3.358 0 0 3.358 0 7.5C0 11.642 3.358 15 7.5 15C11.642 15 15 11.642 15 7.5C15 3.358 11.642 0 7.5 0ZM7.5 14C3.916 14 1 11.084 1 7.5C1 3.916 3.916 1 7.5 1C11.084 1 14 3.916 14 7.5C14 11.084 11.084 14 7.5 14Z" fill="currentColor">
                                </path></svg>
                        </div>

                    </Row>
                    <hr className="my-0 mb-2"></hr>
                    {playlistData && playlistData.length > 0 && playlistData.map((song, index) => {

                        return <PlaylistItem key={index} song={song} index={index}></PlaylistItem>
                    })}

                </Col>
            </Row>
        </Col>

    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
