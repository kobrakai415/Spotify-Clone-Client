import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Col, Row, } from "react-bootstrap"
import { CgPlayButton } from "react-icons/cg"
import { BiPause } from "react-icons/bi"
import { IoMdHeart } from "react-icons/io"
import { connect } from 'react-redux';
import { addArtistToFavourites, removeArtistFromFavourites, playPause, addTrackToFavourites, removeTrackFromFavourites, setCurrentSong } from "../redux/actions"
import AlbumContainer from '../components/AlbumContainer';
import ArtistContainer from "../components/ArtistContainer"
import ArtistListItem from "../components/ArtistListItem"

const ApiUrl = process.env.REACT_APP_SPOTIFY_API

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    favouriteArtist: (artist) => dispatch(addArtistToFavourites(artist)),
    unFavouriteArtist: (artist) => dispatch(removeArtistFromFavourites(artist)),
    playPause: () => dispatch(playPause()),
    favouriteTrack: (track) => dispatch(addTrackToFavourites(track)),
    unFavouriteTrack: (track) => dispatch(removeTrackFromFavourites(track)),
    setPlaying: (track) => dispatch(setCurrentSong(track))

})

const ArtistPage = ({ token, media, favourites, playPause, favouriteArtist, unFavouriteArtist }) => {

    const [artistData, setArtistData] = useState(null)
    const [topTracks, setTopTracks] = useState([])
    const [relatedArtists, setRelatedArtists] = useState([])
    const [albums, setAlbums] = useState([])
    
    const [show, setShow] = useState(false)

    const { id } = useParams()

    const fetchArtistData = async () => {
        try {
            const res = await fetch(`${ApiUrl}/artists/${id}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            const json = await res.json()
            console.log(json)
            setArtistData(json)

        } catch (error) {
            console.log(error)
        }
    }

    const fetchTopTracks = async () => {
        try {
            const res = await fetch(`${ApiUrl}/artists/${id}/top-tracks?country=GB`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            const json = await res.json()
            console.log(json)
            setTopTracks(json.tracks)

        } catch (error) {
            console.log(error)
        }
    }

    const fetchRelatedArtists = async () => {
        try {
            const res = await fetch(`${ApiUrl}/artists/${id}/related-artists`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            const json = await res.json()
            console.log(json)
            setRelatedArtists(json.artists)

        } catch (error) {
            console.log(error)
        }
    }

    const fetchAlbums = async () => {
        try {
            const res = await fetch(`${ApiUrl}/artists/${id}/albums`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            const json = await res.json()
            console.log(json)
            setAlbums(json.items)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchArtistData()
        fetchTopTracks()
        fetchRelatedArtists()
        fetchAlbums()
    }, [id])

    return (
        <Col className="main-page main-page-mobile p-0" xs={12} md={9} lg={10}>
            <Row className="mx-0 fade-bg">
                <Col md={12}>


                    {artistData &&
                        <Row className="mt-5">
                            <Col className="d-flex justify-content-center" xs={12} md={4}>

                                <img height="190px" src={artistData.images[0]?.url} alt="playlist-cover" />
                            </Col>
                            <Col className="pt-5 text-center" xs={12} md={8}>

                                <h1>{artistData.name}</h1>
                                <p>{artistData.description}</p>
                                <div>

                                    <span>{artistData.followers.total.toLocaleString()} monthly listeners  </span>

                                </div>
                            </Col>
                        </Row>
                    }

                </Col>



                <Col className="p-3 p-md-5 mt-5">

                    <Row className="pb-3">
                        <Col xs={12}>

                            {!media.play && <CgPlayButton onClick={playPause} className="me-4" style={{ fontSize: "55px", backgroundColor: "1db954", borderRadius: "50%" }} />}
                            {media.play && <BiPause onClick={playPause} className="me-4" style={{ fontSize: "55px", backgroundColor: "1db954", borderRadius: "50%" }} />}

                            {favourites.artists.find(item => item.id === artistData?.id) ? <IoMdHeart className="me-4" style={{ fontSize: "35px", color: "1db954" }} onClick={() => { unFavouriteArtist(artistData) }} />
                                : <IoMdHeart className="me-4" style={{ fontSize: "35px", }} onClick={() => { favouriteArtist(artistData); }} />}


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
                    {topTracks.length > 0 &&

                        <>
                            <Row>
                                <Col>

                                    {topTracks.slice(0, 5).map((song, index) => {

                                        return (
                                            <ArtistListItem key={index} index={index} song={song} />
                                        )
                                    })}
                                </Col>
                            </Row>


                            <Row className={show ? "d-flex" : "d-none"}>
                                <Col>

                                    {topTracks.slice(4, 9).map((song, index) => {
                                        return (
                                            <ArtistListItem key={index} index={index + 5} song={song} />
                                        )
                                    })}
                                </Col>
                            </Row>
                            <Row>
                                <span className="text-muted ps-4" onClick={() => setShow(!show)}>{show ? "See less" : "See more"}</span>
                            </Row>
                        </>}

                    <Row>

                        {relatedArtists.length > 0 &&

                            <>
                                <h4 className="my-3">Related Artists </h4>
                                {relatedArtists.slice(0, 6).map((artist, index) => {

                                    return (
                                        <ArtistContainer key={index} index={index} artist={artist}></ArtistContainer>
                                    )
                                })}
                            </>
                        }


                    </Row>

                    <Row>
                        {albums.length > 0 && 
                        <>
                        <h4 className="my-3">Albums</h4>
                            {albums.slice(0,6).map((album, index) => {
                                return (
                                    <AlbumContainer key={index} index={index} album={album}></AlbumContainer>
                                )
                            } )}
                        </>
                        
                        }

                    </Row>

                </Col>







            </Row>
        </Col>

    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
