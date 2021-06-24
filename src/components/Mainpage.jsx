import { useState, useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import Category from "./CategoryContainer.jsx"
import ArtistContainer from "./ArtistContainer.jsx"


const ApiUrl = process.env.REACT_APP_SPOTIFY_API

const Mainpage = (props) => {

    const [browseAll, setBrowseAll] = useState(null)
    const [query, setQuery] = useState("")
    const [artistResults, setArtistResults] = useState(null)
    const [albumResults, setAlbumResults] = useState(null)
    const [trackResults, setTrackResults] = useState(null)




    const fetchBrowseAll = async () => {
        try {
            let response = await fetch(`${ApiUrl}/browse/categories`, {
                headers: {
                    "Authorization": "Bearer " + props.token
                }
            })

            if (response.ok) {
                let json = await response.json()

                setBrowseAll(json.categories.items)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const fetchQueryArtists = async () => {
        try {
            let response = await fetch(`${ApiUrl}/search?q=${query}&type=artist`, {
                headers: {
                    "Authorization": "Bearer " + props.token
                }
            })

            if (response.ok) {
                let json = await response.json()
                console.log(json.artists.items)
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
                    "Authorization": "Bearer " + props.token
                }
            })

            if (response.ok) {
                let json = await response.json()

                setAlbumResults(json)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchQueryTracks = async () => {
        try {
            let response = await fetch(`${ApiUrl}/search?q=${query}&type=track`, {
                headers: {
                    "Authorization": "Bearer " + props.token
                }
            })

            if (response.ok) {
                let json = await response.json()

                setTrackResults(json)
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchBrowseAll()
    }, [])

    useEffect(() => {

        if (query.length > 0) {
            fetchQueryArtists()
            fetchQueryTracks()
            fetchQueryAlbums()
        }

    }, [query])


    return (
        <Col className="main-page main-page-mobile" xs={12} md={9} lg={10}>
            <div id="search-bar-parent">
                <input id="search-bar" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Songs, Artists or Albums" />
                <svg className="search-bar-glass" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentcolor"></path>
                </svg>
            </div>
            <h3 className="py-3 px-2">Your Top Genres</h3>

            <Row>


                {query.length > 0 && artistResults &&
                    <h3 className="py-3 px-2">Artists</h3>}

                {artistResults && query.length > 0 ? artistResults.slice(0,5).map(artist => {
                    return <ArtistContainer key={artist.id} artist={artist}></ArtistContainer>
                }) : <h1>Loadsadfasdfasdfing</h1>}


            </Row>
            <h3 className="py-3 px-2">Albums</h3>



            <Row className="mx-0">
                <h3 className="py-3 px-2">Browse All</h3>
                {browseAll && browseAll.map((item, index) => {
                    return <Category key={index} cat={item}></Category>
                })}
            </Row>
        </Col>



    )

}

export default Mainpage