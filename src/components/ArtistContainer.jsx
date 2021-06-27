import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Card } from "react-bootstrap"

const ArtistContainer = (props) => {

    const directToPlaylist = () => {
        try {

            props.history.push(`/playlist/`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center mb-4 col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">

            <Card style={{ maxWidth: '14rem' }} bg="dark" >
                <Card.Body>

                    <Link to={`/artist/${props.artist.id}`}>
                        <img className="img-fluid w-100" style={{ borderRadius: "50%", maxHeight: "120px", maxWidth: "120px" }} height={125} width={125} src={props.artist.images[0]?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9uvF65nH7m-aoxHulInp9xFBJjZsuZuOw1w&usqp=CAU"} alt="playlist-cover" />
                    </Link>

                    <div className="my-2">

                        <span className="w-100 text-truncate">{props.artist.name}</span>
                        <p>Artist</p>

                    </div>
                </Card.Body>
            </Card>

        </div>

    );
}

export default withRouter(ArtistContainer);
