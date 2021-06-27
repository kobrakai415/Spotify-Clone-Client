import React, { useState, useEffect } from 'react';
import { Row, Col } from "react-bootstrap"
import AlbumContainer from '../components/AlbumContainer';


const ApiUrl = process.env.REACT_APP_SPOTIFY_API

const Mainpage = (props) => {

    const [latestReleases, setLatestReleases] = useState([])


    const fetchLatestReleases = async () => {
        try {
            const res = await fetch(`${ApiUrl}/browse/new-releases`, {
                headers: {
                    "Authorization": "Bearer " + props.token
                }
            })

            if (res.ok) {
                const json = await res.json()
                console.log(json)
                setLatestReleases(json.albums.items)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>
        fetchLatestReleases(), [])

    return (

        <Col className="main-page main-page-mobile" xs={12} md={9} lg={10}>
            <Row className="mx-0">

                <h1>Good Afternoon </h1>

                {latestReleases.length > 0 && <>

                    <h3 className="mb-3">Latest Releases</h3>

                    {latestReleases.slice(0, 12).map(album => {
                        return <AlbumContainer key={album.id} album={album} />
                    })}
                </>}

            </Row>
        </Col>

    );
}

export default Mainpage;
