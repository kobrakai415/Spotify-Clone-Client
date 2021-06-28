import React from 'react';
import { withRouter } from 'react-router-dom';

const PlaylistContainer = ({ playlist, history }) => {

    const directToPlaylist = () => {
        try {
            
           history.push(`/playlist/${playlist.id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div onClick={directToPlaylist} className="category-container d-flex align-items-center justify-content-center mb-4 col-6 col-md-4 col-lg-3 col-xl-2">

            <img className="img-fluid" src={playlist.images[0]?.url} alt="playlist-cover"></img>

        </div>

    );
}

export default withRouter(PlaylistContainer);
