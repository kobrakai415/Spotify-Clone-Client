import { Component } from "react"
import Sidebar from "./sidebar.jsx"
import Mainpage from "./Mainpage.jsx"
import Mediaplayer from "./Mediaplayer.jsx"
import { Container, Row } from "react-bootstrap"
import { BrowserRouter as Router, Route } from 'react-router-dom'

class Home extends Component {

    state = {
        songs: [],
        query: "",
        selectedSongID: 345,
        selectedSong: {
            "id": 533609232,
            "readable": true,
            "title": "God's Plan",
            "title_short": "God's Plan",
            "title_version": "",
            "link": "https://www.deezer.com/track/533609232",
            "duration": 198,
            "rank": 944783,
            "explicit_lyrics": true,
            "explicit_content_lyrics": 1,
            "explicit_content_cover": 1,
            "preview": "https://cdns-preview-9.dzcdn.net/stream/c-9990cd5b96f85daf3f3dc57ed801a899-6.mp3",
            "md5_image": "b69d3bcbd130ad4cc9259de543889e30",
            "artist": {
                "id": 246791,
                "name": "Drake",
                "link": "https://www.deezer.com/artist/246791",
                "picture": "https://api.deezer.com/artist/246791/image",
                "picture_small": "https://cdns-images.dzcdn.net/images/artist/5d2fa7f140a6bdc2c864c3465a61fc71/56x56-000000-80-0-0.jpg",
                "picture_medium": "https://cdns-images.dzcdn.net/images/artist/5d2fa7f140a6bdc2c864c3465a61fc71/250x250-000000-80-0-0.jpg",
                "picture_big": "https://cdns-images.dzcdn.net/images/artist/5d2fa7f140a6bdc2c864c3465a61fc71/500x500-000000-80-0-0.jpg",
                "picture_xl": "https://cdns-images.dzcdn.net/images/artist/5d2fa7f140a6bdc2c864c3465a61fc71/1000x1000-000000-80-0-0.jpg",
                "tracklist": "https://striveschool-api.herokuapp.com/api/deezer/artist/246791/top?limit=50",
                "type": "artist"
            },
            "album": {
                "id": 69319552,
                "title": "Scorpion",
                "cover": "https://api.deezer.com/album/69319552/image",
                "cover_small": "https://cdns-images.dzcdn.net/images/cover/b69d3bcbd130ad4cc9259de543889e30/56x56-000000-80-0-0.jpg",
                "cover_medium": "https://cdns-images.dzcdn.net/images/cover/b69d3bcbd130ad4cc9259de543889e30/250x250-000000-80-0-0.jpg",
                "cover_big": "https://cdns-images.dzcdn.net/images/cover/b69d3bcbd130ad4cc9259de543889e30/500x500-000000-80-0-0.jpg",
                "cover_xl": "https://cdns-images.dzcdn.net/images/cover/b69d3bcbd130ad4cc9259de543889e30/1000x1000-000000-80-0-0.jpg",
                "md5_image": "b69d3bcbd130ad4cc9259de543889e30",
                "tracklist": "https://api.deezer.com/album/69319552/tracks",
                "type": "album"
            },
            "type": "track"
        },
    }


    componentDidMount = async () => {

        try {
            let response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=drake")
            let json = await response.json()

            this.setState({ songs: json.data })
            console.log(json)
            
        } catch (error) {
            console.log(error)
        }

    }
    componentDidUpdate = async (previousProps, previousState) => {

        if (previousState.selectedSongID != this.state.selectedSongID) {
            let selected = await this.findSelectedSong()
            this.setState({ selectedSong: selected })
        }

        try {
            if (previousState.query != this.state.query) {

                let response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + this.state.query)
                let json = await response.json()

                this.setState({ songs: json.data })
                console.log(json)
            }

        } catch (error) {
            console.log(error)
        }

    }

    queryHandler = (e) => {

        this.setState({ query: e.target.value })

    }

    selectedSongHandler = (e) => {

        this.setState({ selectedSongID: e.target.id })

    }

    findSelectedSong = () => {

       return this.state.songs.find(song => song.id.toString() === this.state.selectedSongID)

    }



    render() {
        return (
            <Container fluid className="px-0">
                <Row className="mx-0">
                    <Sidebar query={this.state.query} queryHandler={this.queryHandler}></Sidebar>

                <Router>
                <Route path="/" exact>
                    <Mainpage selectedSongHandler={this.selectedSongHandler} songs={this.state.songs}></Mainpage>
                </Route>
                </Router>

                </Row>

                <Row className="mx-0 p-1">
                    <Mediaplayer></Mediaplayer>
                </Row>

            </Container>

        )
    }
}

export default Home