import React, { useState, useEffect } from 'react';
import { Row, Col } from "react-bootstrap"
import AlbumContainer from '../components/AlbumContainer';
import SearchPlaylistContainer from "../components/SearchPlaylistContainer"

const ApiUrl = process.env.REACT_APP_SPOTIFY_API

const Mainpage = (props) => {

    const [latestReleases, setLatestReleases] = useState([])
    const [featuredPlaylists, setFeaturedPlaylists] = useState([])


    const fetchLatestReleases = async () => {
        try {
            const res = await fetch(`${ApiUrl}/browse/new-releases`, {
                headers: {
                    "Authorization": "Bearer " + props.token
                }
            })

            if (res.ok) {
                const json = await res.json()
                setLatestReleases(json.albums.items)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchFeaturedPlaylists = async () => {
        try {
            const res = await fetch(`${ApiUrl}/browse/featured-playlists?country=GB`, {
                headers: {
                    "Authorization": "Bearer " + props.token
                }
            })
            if (res.ok) {
                const json = await res.json()
                console.log(json)
                setFeaturedPlaylists(json.playlists.items)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {

        fetchLatestReleases()
        fetchFeaturedPlaylists()

    }, [])

    return (

        <Col className="main-page main-page-mobile p-3" xs={12} md={9} lg={10}>
            <Row className="mx-0">

                <h1 className="pt-5">Good Afternoon </h1>

                {latestReleases.length > 0 && <>

                    <h3 className="py-3">Latest Releases</h3>

                    {latestReleases.slice(0, 12).map(album => {
                        return <AlbumContainer key={album.id} album={album} />
                    })}
                </>}

                {featuredPlaylists.length > 0 && <>

                    <h3 className="py-3">Featured Playlists</h3>

                    {featuredPlaylists.slice(0, 12).map(playlist => {
                        return <SearchPlaylistContainer key={playlist.id} playlist={playlist} />
                    })}
                </>}

            </Row>
        </Col>

    );
}

export default Mainpage;
