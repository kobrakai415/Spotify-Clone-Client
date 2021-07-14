import React, { useState } from 'react';
import { Col, Row } from "react-bootstrap"
import { connect } from "react-redux"
import SearchPlaylistContainer from "../components/SearchPlaylistContainer"
import AlbumContainer from "../components/AlbumContainer"
import ArtistContainer from "../components/ArtistContainer"
import LikedSongsPage from './LikedSongsPage';
import {withRouter, Link} from "react-router-dom"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({

})


const LibraryPage = ({ favourites }) => {
    const [selected, setSelected] = useState("Playlists")

    return (

        <Col className="main-page main-page-mobile p-3" xs={12} md={9} lg={10}>
            <Row className="mx-0 mb-3"  >
                <Col className="d-flex ps-sm-5 pt-4 pb-4" xs={12}>
                    <span onClick={() => setSelected("Playlists")} className={selected === "Playlists" ? "selected library-links p-2" : "library-links p-2"}>Playlists</span>
                    <span onClick={() => setSelected("Albums")} className={selected === "Albums" ? "selected library-links p-2" : "library-links p-2"}>Albums</span>
                    <span onClick={() => setSelected("Artists")} className={selected === "Artists" ? "selected library-links p-2" : "library-links p-2"}>Artists</span>
                    <Link className="p-2" to="/likedsongs">
                    <span onClick={() => setSelected("Tracks")} className="liked-songs library-links p-2">Liked Songs</span>
                    </Link>
                </Col>


                {selected === "Playlists" &&
                    <>
                        <h4 className="ps-3 mb-4">Playlists</h4>
                        {favourites.playlists.map(playlist => {
                            return <SearchPlaylistContainer key={playlist.id} playlist={playlist} />
                        })}
                    </>
                }


                {selected === "Albums" &&
                    <>
                        <h4 className="ps-3 mb-4">Albums</h4>
                        {favourites.albums.map(album => {
                            return <AlbumContainer key={album.id} album={album} />
                        })}
                    </>
                }

                {selected === "Artists" &&
                    <>
                        <h4 className="ps-3 mb-4">Artists</h4>
                        {favourites.artists.map(artist => {
                            return <ArtistContainer key={artist.id} artist={artist} />
                        })}
                    </>
                }

                {selected === "Tracks" && <LikedSongsPage />
                }
            </Row>

        </Col>

    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LibraryPage));
