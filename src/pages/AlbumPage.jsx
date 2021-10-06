import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Col, Row } from "react-bootstrap"
import { CgPlayButton } from "react-icons/cg"
import { IoMdHeart } from "react-icons/io"
import { connect } from 'react-redux';
import { addAlbumToFavourites, removeAlbumFromFavourites, playPause, addTrackToFavourites, removeTrackFromFavourites, setCurrentSong, fetchAlbumData } from "../redux/actions"
import { BiPause } from "react-icons/bi"
import AlbumListItem from '../components/AlbumListItem';


const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    favouriteAlbum: (album) => dispatch(addAlbumToFavourites(album)),
    unFavouriteAlbum: (album) => dispatch(removeAlbumFromFavourites(album)),
    playPause: () => { dispatch(playPause()) },
    favouriteTrack: (track) => { dispatch(addTrackToFavourites(track)) },
    unFavouriteTrack: (track) => { dispatch(removeTrackFromFavourites(track)) },
    setPlaying: (track) => { dispatch(setCurrentSong(track)) },
    fetchAlbumData: (id, token) => dispatch(fetchAlbumData(id, token))

})

const AlbumPage = ({ token, media, favourites, favouriteAlbum, unFavouriteAlbum, favouriteTrack, unFavouriteTrack, playPause, setPlaying, fetchAlbumData, data }) => {

    const albumInfo = data.albumInfo
    const albumData = data.albumData

    const { id } = useParams()

    const playHandler = () => {
        const songToPlay = albumData.find(item => item.track?.preview_url !== null)

        if (songToPlay) {
         
            setPlaying({ ...songToPlay, album: { images: [...albumInfo.images] } });
            playPause()
        } else {
            return

        }
    }

    useEffect(() => {
        fetchAlbumData(id, token)

    }, [id])


    return (
        <Col className="main-page main-page-mobile p-0" xs={12} md={9} lg={10}>
            <Row className="mx-0 fade-bg">
                <Col md={12}>


                    {albumInfo &&
                        <Row className="mt-5">
                            <Col className="d-flex justify-content-center" xs={12} md={4}>

                                <img className="shadow-lg pl-3" height="190px" src={albumInfo.images[0]?.url} alt="playlist-cover" />
                            </Col>
                            <Col className="pt-5 text-center" xs={12} md={8}>
                                <span>{albumInfo.album_type.toUpperCase()}</span>
                                <h1>{albumInfo.name}</h1>

                                <div>
                                    <strong>Spotify • </strong>
                                    {/* <span>{albumInfo.followers.total} likes • </span> */}
                                    <span>{albumInfo.tracks.items.length} {albumInfo.tracks.items.length > 1 ? "songs" : "song"} </span>
                                </div>
                            </Col>
                        </Row>
                    }


                </Col>

                <Col className="p-3 p-md-5 mt-5">

                    <Row className="pb-3">
                        <Col xs={12}>

                            {!media.play && <CgPlayButton onClick={playHandler} className="me-4" style={{ fontSize: "55px", backgroundColor: "1db954", borderRadius: "50%" }} />}
                            {media.play && albumData.some(item => item.id === media.selectedSong.id) && 
                            <BiPause onClick={playPause} className="me-4" style={{ fontSize: "55px", backgroundColor: "1db954", borderRadius: "50%" }} />}

                            {media.play && !albumData.some(item => item.id === media.selectedSong.id) && 
                            <CgPlayButton onClick={() => {playHandler(); playPause()}} className="me-4" style={{ fontSize: "55px", backgroundColor: "1db954", borderRadius: "50%" }} />}

                            {favourites.albums.find(item => item.id === albumInfo?.id) ? <IoMdHeart className="me-4" style={{ fontSize: "35px", color: "1db954" }} onClick={() => { unFavouriteAlbum(albumInfo) }} />
                                : <IoMdHeart className="me-4" style={{ fontSize: "35px", }} onClick={() => { favouriteAlbum(albumInfo); }} />}


                            <svg fill="grey" role="img" height="32" width="32" viewBox="0 0 32 32" className="Svg-sc__sc-1bi12j5-0 hPiOwj">
                                <path d="M5.998 13.999A2 2 0 105.999 18a2 2 0 00-.001-4zm10.001 0A2 2 0 1016 18a2 2 0 000-4zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z"></path>
                            </svg>
                        </Col>
                    </Row>

                    <Row className="mx-0 p-2">

                        <div className="text-muted col-2 col-md-1">#</div>
                        <div className="text-muted col-7 col-md-9">TITLE</div>

                        <div className="text-muted col-3 col-md-2" ><svg className="mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.999 3H6.999V7V8H7.999H9.999V7H7.999V3ZM7.5 0C3.358 0 0 3.358 0 7.5C0 11.642 3.358 15 7.5 15C11.642 15 15 11.642 15 7.5C15 3.358 11.642 0 7.5 0ZM7.5 14C3.916 14 1 11.084 1 7.5C1 3.916 3.916 1 7.5 1C11.084 1 14 3.916 14 7.5C14 11.084 11.084 14 7.5 14Z" fill="currentColor"></path></svg></div>

                    </Row>

                    <hr className="my-0 mb-2"></hr>
                    {albumData && albumData.length > 0 && albumData.map((song, index) => {

                        return (
                            <AlbumListItem albumInfo={albumInfo} index={index} song={song} />
                        )
                    })}

                </Col>
            </Row>
        </Col>

    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
