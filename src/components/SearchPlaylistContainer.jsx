import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {Card} from "react-bootstrap"

const SearchPlaylistContainer = ({ playlist, history }) => {

    const directToPlaylist = () => {
        try {

            history.push(`/playlist/${playlist.id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="d-flex justify-content-center wrapper align-items-center mb-4 col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">

            <Card className="shadow-lg" style={{ maxWidth: '14rem', width: "14rem", backgroundColor: "#181818" }} >
                <Card.Body>


                    <Link to={`/playlist/${playlist.id}`}>
                        <div className="d-flex justify-content-center">
                            <img className="img-fluid w-100" style={{ maxHeight: "111px", maxWidth: "178px" }} height={140} width={178} src={playlist.images[0]?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9uvF65nH7m-aoxHulInp9xFBJjZsuZuOw1w&usqp=CAU"} alt="playlist-cover" />
                        </div>
                    </Link>

                    <div className="my-2">

                        <h6 className="text-truncate">{playlist.name}</h6>
                        <p className="text-muted text-truncate">By {playlist.owner?.display_name || ""}</p>

                    </div>
                </Card.Body>
            </Card>

        </div>

    );
}

export default withRouter(SearchPlaylistContainer);
