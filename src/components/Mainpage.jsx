import { Component } from "react"
import { Col, Row } from "react-bootstrap"
import SongContainer from "./SongContainer.jsx"


class Mainpage extends Component {

    render() {
        return (
            <Col className=" main-page main-page-mobile" xs={12} md={9} lg={10}>
               <h3 className="py-3 px-2">Search Results</h3>

               <Row className="mx-0">

               {this.props.songs.map(song =>{
                
                return <SongContainer key={song.id} selectedSongHandler={this.props.selectedSongHandler} song={song} />

            })}
               </Row>
            </Col>



        )
    }
}

export default Mainpage