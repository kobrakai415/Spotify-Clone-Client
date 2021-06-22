import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Table, Col, Row } from "react-bootstrap"
import dateDiff from "../helpers/datediff"
import { durationCalculator } from '../helpers/duration';

const ApiUrl = process.env.REACT_APP_SPOTIFY_API

const PlaylistPage = (props) => {

    const [playlistData, setPlaylistData] = useState([])

    const { id } = useParams()

    const fetchPlaylistData = async () => {
        try {

            const res = await fetch(`${ApiUrl}/playlists/${id}`, {
                headers: {
                    "Authorization": "Bearer " + props.token
                }
            })
            const json = await res.json()

            setPlaylistData(json.tracks.items)

            console.log(json.tracks.items)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPlaylistData()
    }, [])

    return (
        <Col className="main-page main-page-mobile" xs={12} md={9} lg={10}>
            <Row className="mx-0">

                <Table responsive="sm" hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Album</th>
                            <th>Date Added</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                       {playlistData && playlistData.map((song, index) => {

                           return (
                            <tr>
                            <td>{index + 1}</td>
                            <td className="text-truncate"> <img height="35px" src={song.track.album.images[2].url}/> {song.track.name}</td>
                            <td>{song.track.album.name}</td>
                            <td>{dateDiff(song.added_at)}</td>
                            <td>{durationCalculator(song.track.duration_ms)}</td>
                        </tr>
                           )
                       })}
                      
                    </tbody>
                </Table>
            </Row>
        </Col>

    );
}

export default PlaylistPage;
