import React, {useState} from 'react';
import { Col, Row } from "react-bootstrap"
import {connect} from "react-redux"
import PlaylistContainer from "../components/PlaylistContainer.jsx"
import SearchPlaylistContainer from "../components/SearchPlaylistContainer"


const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({

})

const LibraryPage = ({favourites}) => {
    const [selected, setSelected] = useState("Playlists")

    return (
        
        <Col className="main-page main-page-mobile p-3" xs={12} md={9} lg={10}>
            <Row className="mx-0 mb-3"  >
                <Col className="d-flex ps-sm-5 pt-4 pb-4" xs={12}>
                    <a onClick={() => setSelected("Playlists")} className={selected === "Playlists" ? "selected library-links p-2" : "library-links p-2"}>Playlists</a>
                    <a onClick={() => setSelected("Albums")} className={selected === "Albums" ? "selected library-links p-2" : "library-links p-2"}>Albums</a>
                    <a onClick={() => setSelected("Artists")} className={selected === "Artists" ? "selected library-links p-2" : "library-links p-2"}>Artists</a>
                    <a onClick={() => setSelected("Tracks")} className={selected === "Tracks" ? "selected library-links p-2" : "library-links p-2"}>Tracks</a>
                </Col>

            <h4>Playlists</h4>
                {selected === "Playlists" && <h1>Playlists</h1> &&
                favourites.playlists.map(playlist => {
                    return <SearchPlaylistContainer key={playlist.id} playlist={playlist} />
                }) }

                {/* {selected === "Albums" && favourites.albums.map(album => {
                    return <AlbumContainer key={album.id} album={album} />
                }) } */}

                {/* {selected === "Artists" && favourites.artists.map(artist => {
                    return <ArtistContainer key={artist.id} artist={artist} />
                }) } */}

                {/* {selected === "Tracks" && favourites.tracks.map(track => {
                    return <TrackContainer key={track.id} track={track} />
                }) } */}
            </Row>
            
        </Col>

    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryPage);
