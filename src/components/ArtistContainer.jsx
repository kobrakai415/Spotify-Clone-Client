import React from 'react';
import { withRouter } from 'react-router-dom';

const ArtistContainer = (props) => {

    const directToPlaylist = () => {
        try {

            props.history.push(`/playlist/`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div onClick={directToPlaylist} className="category-container d-flex align-items-center justify-content-center mb-4 col-6 col-md-4 col-lg-3 col-xl-2">

            {props.artist && <>
                {/* <img style={{ borderRadius: "50%" }} className="img-fluid" height={150} src={props.artist.images[0].url} alt="playlist-cover" /> */}
                <span>{props.artist.name}</span>
            </>}
        </div>

    );
}

export default withRouter(ArtistContainer);
