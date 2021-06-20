import React from "react"
import { withRouter } from "react-router-dom"

class SongContainer extends React.Component {



    render() {

        
        return (
            <>
          

            <div key={this.props.song.id} className="mb-3 col-4 col-sm-3 col-md-2" >
           
            <img id={this.props.song.artist.id} onClick={ () => this.props.history.push('./artist/' + this.props.song.artist.id)} className="img-fluid"  src={this.props.song.album.cover_xl}/>
            
            <h6 id={this.props.song.id} onClick={(e) => {
            this.props.selectedSongHandler(e)
            }} className="text-center">{this.props.song.title}</h6>
            </div>
           

            </>
        )
    }
}

export default withRouter(SongContainer)