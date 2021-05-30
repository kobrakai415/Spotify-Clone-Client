import { Component } from "react"
import { Col, Row } from "react-bootstrap"
import SongContainer from "./SongContainer.jsx"


class Mainpage extends Component {

    render() {
        return (
            <Col className="main-page" xs={9} lg={10}>
               <h3>Search Results</h3>

               <Row className="no-gutters">

               {this.props.songs.map(song =>{
                
                return <SongContainer key={song.id} selectedSongHandler={this.props.selectedSongHandler} song={song} />

            })}
               </Row>
            </Col>



        )
    }
}

export default Mainpage