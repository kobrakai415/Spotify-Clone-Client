import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {  Col, Row } from "react-bootstrap"
import dateDiff from "../helpers/datediff"
import { durationCalculator } from '../helpers/duration';

const ApiUrl = process.env.REACT_APP_SPOTIFY_API

const AlbumPage = (props) => {

    const [albumData, setAlbumData] = useState([])
    const [albumInfo, setAlbumInfo] = useState(null)

    const { id } = useParams()

    const fetchAlbumData = async () => {
        try {

            const res = await fetch(`${ApiUrl}/albums/${id}`, {
                headers: {
                    "Authorization": "Bearer " + props.token
                }
            })
            const json = await res.json()

            setAlbumData(json.tracks.items)
            setAlbumInfo({ ...json })
            console.log(json)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAlbumData()
    }, [])

    return (
        <Col className="main-page main-page-mobile" xs={12} md={9} lg={10}>
            <Row className="mx-0">
                <Col md={12}>


                    {albumInfo &&
                        <Row className="mt-5">
                            <Col className="d-flex justify-content-center" xs={12} md={4}>

                                <img height="190px" src={albumInfo.images[0]?.url} alt="playlist-cover" />
                            </Col>
                            <Col className="pt-5 text-center" xs={12} md={8}>

                                <h1>{albumInfo.name}</h1>
                           
                                <div>
                                    <strong>Spotify • </strong>
                                    {/* <span>{albumInfo.followers.total} likes • </span> */}
                                    <span>{albumInfo.tracks.items.length} songs, </span>
                                </div>
                            </Col>
                        </Row>
                    }

                </Col>

                <div className="col-12 mt-5">
                    <div className="row mx-0">

                        <p className="col-2 col-md-1">#</p>
                        <p className="col-7 col-md-5 col-lg-4">Title</p>
                        <p className="d-none d-lg-block col-lg-4">Album</p>
                        <p className="d-none d-md-block col-md-4 col-lg-2">Date Added</p>
                        <p className="col-3 col-md-2 col-lg-1" ><svg  className="mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.999 3H6.999V7V8H7.999H9.999V7H7.999V3ZM7.5 0C3.358 0 0 3.358 0 7.5C0 11.642 3.358 15 7.5 15C11.642 15 15 11.642 15 7.5C15 3.358 11.642 0 7.5 0ZM7.5 14C3.916 14 1 11.084 1 7.5C1 3.916 3.916 1 7.5 1C11.084 1 14 3.916 14 7.5C14 11.084 11.084 14 7.5 14Z" fill="currentColor"></path></svg></p>

                    </div>

                    {albumData && albumData.map((song, index) => {

                        return (
                            <div key={index} className="row mx-0">
                                <p className="col-2 col-md-1" >{index + 1}</p>
                                
                                <p className="d-none d-lg-block col-lg-4 text-truncate">{song.name}</p>
                          
                                <p className=" col-3 col-md-2 col-lg-1">{durationCalculator(song.duration_ms)}</p>
                            </div>
                        )
                    })}

                </div>
            </Row>
        </Col>

    );
}

export default AlbumPage;
