import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import AlbumContainer from "../components/AlbumContainer.jsx"
import ArtistContainer from "../components/ArtistContainer.jsx"
import Category from "../components/CategoryContainer.jsx"
import SearchPlaylistContainer from "../components/SearchPlaylistContainer.jsx"
import { fetchBrowseAll } from "../redux/actions/index"
import { connect } from "react-redux"


const ApiUrl = process.env.REACT_APP_SPOTIFY_API

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    fetchBrowseAll: (token) => dispatch(fetchBrowseAll(token))
})

const Mainpage = ({ token, data, fetchBrowseAll}) => {

    const browseAll = data.browseAllData

    const [query, setQuery] = useState("")
    const [artistResults, setArtistResults] = useState([])
    const [albumResults, setAlbumResults] = useState([])
    const [playlistResults, setPlaylistResults] = useState([])

    // const fetchBrowseAll = async () => {
    //     try {
    //         let response = await fetch(`${ApiUrl}/browse/categories?country=GB`, {
    //             headers: {
    //                 "Authorization": "Bearer " + token
    //             }
    //         })

    //         if (response.ok) {
    //             let json = await response.json()

    //             setBrowseAll(json.categories.items)
    //         }

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const fetchQueryArtists = async () => {
        try {
            let response = await fetch(`${ApiUrl}/search?q=${query}&type=artist`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            if (response.ok) {
                let json = await response.json()
                setArtistResults(json.artists.items)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchQueryAlbums = async () => {
        try {
            let response = await fetch(`${ApiUrl}/search?q=${query}&type=album`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            if (response.ok) {
                let json = await response.json()

                setAlbumResults(json.albums.items)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchQueryPlaylists = async () => {
        try {
            let response = await fetch(`${ApiUrl}/search?q=${query}&type=playlist`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            if (response.ok) {
                let json = await response.json()
                console.log(json)
                setPlaylistResults(json.playlists.items)
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchBrowseAll(token)
    }, [])

    useEffect(() => {

        if (query.length > 1) {
            fetchQueryArtists()
            fetchQueryPlaylists()
            fetchQueryAlbums()
        }

    }, [query])


    return (
        <Col className="main-page main-page-mobile p-3" xs={12} md={9} lg={10}>
            <div id="search-bar-parent">
                <input id="search-bar" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Songs, Artists or Albums" />
                <svg className="search-bar-glass" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentcolor"></path>
                </svg>
            </div>


            <Row className="mx-0">


                {query.length > 0 && artistResults.length > 0 &&
                    <h3 className="py-3 px-2">Artists</h3>}

                {artistResults.length > 0 && query.length > 0 && artistResults.slice(0, 6).map(artist => {
                    return <ArtistContainer key={artist.id} artist={artist} />
                })}



                {query.length > 0 && albumResults.length > 0 && albumResults &&
                    <h3 className="py-3 px-2">Albums</h3>}

                {albumResults && query.length > 0 && albumResults.slice(0, 6).map(album => {
                    return <AlbumContainer key={album.id} album={album} />
                })}


                {query.length > 0 && playlistResults.length > 0 && playlistResults &&
                    <h3 className="py-3 px-2">Playlists</h3>}

                {playlistResults && query.length > 0 && playlistResults.slice(0, 6).map(playlist => {
                    return <SearchPlaylistContainer key={playlist.id} playlist={playlist} />
                })}

            </Row>


            <Row className="mx-0">
                {query.length === 0 && <h3 className="py-3 px-2">Browse All</h3>}
                {browseAll && query.length === 0 && browseAll.map((item, index) => {
                    return <Category key={index} cat={item} />
                })}
            </Row>
        </Col>


    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Mainpage)