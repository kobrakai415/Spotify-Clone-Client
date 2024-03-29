import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Card } from "react-bootstrap"

const AlbumContainer = (props) => {

    return (

        <div className="d-flex justify-content-center wrapper align-items-center mb-4 col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">

            <Card className="card-container shadow-lg" style={{ maxWidth: '14rem', width: "14rem", backgroundColor: "#181818" }} >
                <Card.Body>


                    <Link to={`/album/${props.album?.id}`}>
                        <div className="d-flex justify-content-center">
                            <img className="img-fluid w-100" style={{ height: "150px"}} src={props.album.images[0]?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9uvF65nH7m-aoxHulInp9xFBJjZsuZuOw1w&usqp=CAU"} alt="playlist-cover" />
                        </div>
                    </Link>

                    <div className="my-2">

                        <h6 className="text-truncate">{props.album.name}</h6>
                        <p className="text-muted text-truncate">{props.album.artists[0]?.name || "Artist"}</p>

                    </div>
                </Card.Body>
            </Card>

        </div>

    );
}

export default withRouter(AlbumContainer);
