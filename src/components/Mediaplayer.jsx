import { Component } from "react"
import { Col } from "react-bootstrap"
import Next from "../assets/Next.png"
import Play from "../assets/Play.png"
import Previous from "../assets/Previous.png"
import Repeat from "../assets/Repeat.png"
import Shuffle from "../assets/Shuffle.png"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPlay, faStepForward, faStepBackward, faPause, faSync, faRandom, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons"
library.add(faPlay, faStepBackward, faStepForward, faPause, faPlay, faSync, faRandom, faVolumeUp, faVolumeMute)

class Mediaplayer extends Component {
    state = {
        paused: false,
        stopped: true,
        muted: false,
        volume: 50,
        repeat: false,
        shuffle: false,
        media: null
    }

    
   
    render() {
        return (

            <>
                <Col xs={5} md={4} className="media-left d-flex align-items-center ">
                
                        <img height="40px" width="40px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"></img>
                   
                    <div className="d-flex flex-column ms-3">
                        <span>Song Name</span>
                        <small className="text-muted">ritst</small>
                    </div>
                    <div className="d-flex px-3">
                        <svg className="d-none d-sm-flex m-2" role="img" height="16" width="16" viewBox="0 0 16 16"><path fill="currentcolor" d="M13.764 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253A4.05 4.05 0 00.974 5.61c0 1.089.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195A4.052 4.052 0 0014.96 5.61a4.057 4.057 0 00-1.196-2.883zm-.722 5.098L8.58 13.048c-.307.36-.921.36-1.228 0L2.864 7.797a3.072 3.072 0 01-.905-2.187c0-.826.321-1.603.905-2.187a3.091 3.091 0 012.191-.913 3.05 3.05 0 011.957.709c.041.036.408.351.954.351.531 0 .906-.31.94-.34a3.075 3.075 0 014.161.192 3.1 3.1 0 01-.025 4.403z"></path></svg>
                        <svg className="d-none d-sm-flex m-2" role="img" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><path d="M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" fill-rule="nonzero"></path><path d="M10 8h4v3h-4z"></path></g></svg>
                    </div>

                </Col>

                <Col xs={7} md={5} className="d-flex flex-column media-mid">
                    <div className="d-flex align-items-center m-auto">
                        <svg role="img" height="16" width="16" viewBox="0 0 16 16" className="d-none d-sm-flex mx-3 Svg-ulyrgf-0 cMigZB"><path fill="currentcolor" d="M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z"></path></svg>
                        <svg role="img" height="16" width="16" viewBox="0 0 16 16" className="d-none d-sm-flex mx-3 Svg-ulyrgf-0 cMigZB"><path fill="currentcolor" d="M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z"></path></svg>
                        <div id="play-button" className="d-flex justify-content-center align-items-center"><svg role="img" height="16" width="16" viewBox="0 0 16 16" className="Svg-ulyrgf-0 cMigZB"><path fill="black" d="M4.018 14L14.41 8 4.018 2z"></path></svg></div>
                        <svg role="img" height="16" width="16" viewBox="0 0 16 16" className="d-none d-sm-flex mx-3 Svg-ulyrgf-0 cMigZB"><path fill="currentcolor" d="M11 3v4.119L3 2.5v11l8-4.619V13h2V3z"></path></svg>
                        <svg role="img" height="16" width="16" viewBox="0 0 16 16" className="d-none d-sm-flex mx-3 Svg-ulyrgf-0 cMigZB"><path fill="currentcolor"d="M5.5 5H10v1.5l3.5-2-3.5-2V4H5.5C3 4 1 6 1 8.5c0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.6 3.6 5 5.5 5zm9.1 1.7l-.9.5c.2.4.3.8.3 1.3 0 1.9-1.6 3.5-3.5 3.5H6v-1.5l-3.5 2 3.5 2V13h4.5C13 13 15 11 15 8.5c0-.6-.1-1.2-.4-1.8z"></path></svg>

                    </div>

                    <div className="d-flex align-items-center">
                    <span className="currentTime">00:00</span>

                    <div className="mx-3 progress-bar" style={{height: "2px", width: "90%", backgroundColor: "#b3b3b3"}} role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                         <audio />
                    </div>
                    <span className="duration">00:00</span>
                    </div>

                </Col>

                <Col md={3} className="d-none d-md-flex media-right justify-content-end align-items-center">
                        <div className="p-2">
                            <svg className="px-2" role="presentation" height="16" width="16" aria-label="Volume high" id="volume-icon" viewBox="0 0 16 16" class="Svg-ulyrgf-0 cMigZB"><path fill="currentcolor" d="M12.945 1.379l-.652.763c1.577 1.462 2.57 3.544 2.57 5.858s-.994 4.396-2.57 5.858l.651.763a8.966 8.966 0 00.001-13.242zm-2.272 2.66l-.651.763a4.484 4.484 0 01-.001 6.397l.651.763c1.04-1 1.691-2.404 1.691-3.961s-.65-2.962-1.69-3.962zM0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732z"></path></svg>
                        </div>
                        <input className="volume-slider" type="range" style={{height: "2px", backgroundColor: "#b3b3b3"}} defaultValue={100} onchange />
                </Col>
            </>



        )
    }
}

export default Mediaplayer