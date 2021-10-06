import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Card } from "react-bootstrap"

const ArtistContainer = (props) => {


    return (
        <div className="d-flex justify-content-center wrapper align-items-center mb-4 col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">

            <Card className="shadow-lg " style={{ maxWidth: '14rem',  width: "14rem", backgroundColor: "#181818" }}  >
                <Card.Body >

                    <Link className="d-flex flex-column justify-content-center align-items-center" to={`/artist/${props.artist.id}`}>
                        <img className="img-fluid w-100" style={{ borderRadius: "50%", maxHeight: "150px", height: "150px", width: "7rem", maxWidth: "150px"}} src={props.artist.images[0]?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9uvF65nH7m-aoxHulInp9xFBJjZsuZuOw1w&usqp=CAU"} alt="playlist-cover" />
                    </Link>

                    <div className="my-2 text-truncate">

                        <span className="text-truncate">{props.artist.name}</span>
                        <p className="text-muted text-truncate">Artist</p>

                    </div>
                </Card.Body>
            </Card>

        </div>

    );
}

export default withRouter(ArtistContainer);
