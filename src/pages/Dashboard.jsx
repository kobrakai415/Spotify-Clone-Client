import { Component } from "react"
import Sidebar from "../components/Sidebar.jsx"
import SearchPage from "./SearchPage.jsx"
import Mediaplayer from "../components/Mediaplayer.jsx"
import { Container, Row, Col } from "react-bootstrap"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CategoryPage from "./CategoryPage.jsx"
import PlaylistPage from "./PlaylistPage.jsx"
import MainPage from "./MainPage.jsx"
import AlbumPage from "./AlbumPage.jsx"
import ArtistPage from "./ArtistPage.jsx"
import LibraryPage from "./LibraryPage.jsx"
import LikedSongsPage from "./LikedSongsPage.jsx"

class Dashboard extends Component {

    render() {
        return (
            <Container fluid className="px-0">
                <Row className="mx-0 main-section">



                    <Router>
                        <Sidebar token={this.props.token} />

                        <Route path="/" exact render={(routerProps) => <MainPage routerProps={routerProps} token={this.props.token} />} />
                        <Route path="/search" exact render={(routerProps) => <SearchPage routerProps={routerProps} token={this.props.token} />} />
                        <Route path="/library" exact render={(routerProps) => <LibraryPage routerProps={routerProps} token={this.props.token} />} />
                        <Route path="/album/:id" exact render={(routerProps) => <AlbumPage routerProps={routerProps} token={this.props.token} />} />
                        <Route path="/artist/:id" exact render={(routerProps) => <ArtistPage routerProps={routerProps} token={this.props.token} />} />
                        <Route path="/category/:category" render={(routerProps) => <CategoryPage routerProps={routerProps} token={this.props.token} />} />
                        <Route path="/likedsongs" render={(routerProps) => <LikedSongsPage routerProps={routerProps} token={this.props.token} />} />
                        <Route path="/playlist/:id" render={(routerProps) => <PlaylistPage routerProps={routerProps} token={this.props.token} />} />
                    </Router>


                    <Col xs={12} className="media-player">
                        <Row className="mx-0">
                            <Mediaplayer />
                        </Row>
                    </Col>
                </Row>


            </Container>

        )
    }
}

export default Dashboard