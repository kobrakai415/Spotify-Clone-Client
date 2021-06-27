import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {  Col, Row } from "react-bootstrap"
import dateDiff from "../helpers/datediff"
import { durationCalculator } from '../helpers/duration';

const ApiUrl = process.env.REACT_APP_SPOTIFY_API

const ArtistPage = (props) => {

    const [artistData, setArtistData] = useState(null)

    const { id } = useParams()

    const fetchArtistData = async () => {
        try {

            const res = await fetch(`${ApiUrl}/artists/${id}`, {
                headers: {
                    "Authorization": "Bearer " + props.token
                }
            })
            const json = await res.json()
            console.log(json)
            setArtistData(json)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchArtistData()
    }, [])

    return (
        <Col className="main-page main-page-mobile" xs={12} md={9} lg={10}>
            <Row className="mx-0">
                <Col md={12}>


                    {artistData &&
                        <Row className="mt-5">
                            <Col className="d-flex justify-content-center" xs={12} md={4}>

                                <img height="190px" src={artistData.images[0]?.url} alt="playlist-cover" />
                            </Col>
                            <Col className="pt-5 text-center" xs={12} md={8}>

                                <h1>{artistData.name}</h1>
                                {/* <p>{artistData.description}</p> */}
                                <div>
                                    <strong>Spotify • </strong>
                                    <span>{artistData.followers.total.toLocaleString()} monthly listeners • </span>
                                    {/* <span>{artistData.tracks.items.length} songs, </span> */}
                                </div>
                            </Col>
                        </Row>
                    }

                </Col>

                {/* <div className="col-12 mt-5" variant="dark">
                    <div className="row mx-0">

                        <p className="col-2 col-md-1">#</p>
                        <p className="col-7 col-md-5 col-lg-4">Title</p>
                        <p className="d-none d-lg-block col-lg-4">Album</p>
                        <p className="d-none d-md-block col-md-4 col-lg-2">Date Added</p>
                        <p className="col-3 col-md-2 col-lg-1" ><svg  className="mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.999 3H6.999V7V8H7.999H9.999V7H7.999V3ZM7.5 0C3.358 0 0 3.358 0 7.5C0 11.642 3.358 15 7.5 15C11.642 15 15 11.642 15 7.5C15 3.358 11.642 0 7.5 0ZM7.5 14C3.916 14 1 11.084 1 7.5C1 3.916 3.916 1 7.5 1C11.084 1 14 3.916 14 7.5C14 11.084 11.084 14 7.5 14Z" fill="currentColor"></path></svg></p>

                    </div>

                    {playlistData && playlistData.map((song, index) => {

                        return (
                            <div key={index} className="row mx-0">
                                <p className="col-2 col-md-1" >{index + 1}</p>
                                <p className="col-7 col-md-5 col-lg-4 text-truncate"> <img height="35px" src={song.track.album.images[2].url} alt="song-cover" /> {song.track.name} </p>
                                <p className="d-none d-lg-block col-lg-4 text-truncate">{song.track.album.name}</p>
                                <p className="d-none d-md-block col-md-4 col-lg-2">{dateDiff(song.added_at)}</p>
                                <p className=" col-3 col-md-2 col-lg-1">{durationCalculator(song.track.duration_ms)}</p>
                            </div>
                        )
                    })}

                </div> */}
            </Row>
        </Col>

    );
}

export default ArtistPage;
