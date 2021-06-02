import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPlay, faStepForward, faStepBackward, faPause, faSync, faRandom, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

library.add(faPlay, faStepBackward, faStepForward, faPause, faPlay, faSync, faRandom, faVolumeUp, faVolumeMute)

class MediaControl extends React.Component {
    state = {
        paused: false,
        stopped: true,
        muted: false,
        volume: 50,
        repeat: false,
        shuffle: false,
        media: null
    }

    doStartPlay = () => {
        //
    }

    doStopPlay = () => {
        //
    }

    doPausePlay = () => {
        //
    }

    doNextTrack = () => {
        //
    }

    doPrevTrack = () => {
        //
    }

    doSeekTo = () => {
        //
    }

    render() {
        return (
            <div className="player container-fluid fixed-bottom bg-container">
                <div className="row justify-content-between playBar">
                    <div className="col-3 pt-3 px-3 m-auto">
                        <div className="playerArtistInfo d-flex">
                            <img src={this.props.nowPlaying.album.cover} alt="" width="64px" className="img-fluid" />
                            <div className="d-flex flex-column">
                                <Link className="no-underline" to={"/track/" + this.props.nowPlaying.id}>
                                    <p className="link-dim px-2 pt-3">{this.props.nowPlaying.title}</p>
                                </Link>
                                <Link className="no-underline" to={"/artist/" + this.props.nowPlaying.artist.id}>
                                    <p className="link-dim px-2">by {this.props.nowPlaying.artist.name}</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 pt-4">
                        <div className="playerControls w-50 d-flex justify-content-between mb-2">
                            <FontAwesomeIcon
                                onClick={() => {
                                    this.setState({ shuffle: !this.state.shuffle })
                                }}
                                className={this.state.shuffle ? "text-light" : "link-dim"}
                                icon="random"
                            />
                            <FontAwesomeIcon
                                onClick={() => {
                                    //
                                }}
                                className="link-dim"
                                icon="step-backward"
                            />
                            <FontAwesomeIcon
                                onClick={() => {
                                    if (this.state.media !== null) {
                                        if (this.state.paused || this.state.stopped) this.doStartPlay()
                                        else this.doPausePlay()
                                        this.setState({ paused: !this.state.paused })
                                    }
                                }}
                                className="link-dim"
                                icon={this.state.paused ? "pause" : "play"}
                            />
                            <FontAwesomeIcon
                                onClick={() => {
                                    //
                                }}
                                className="link-dim"
                                icon="step-forward"
                            />
                            <FontAwesomeIcon
                                onClick={() => {
                                    this.setState({ repeat: !this.state.repeat })
                                }}
                                className={this.state.repeat ? "text-light" : "link-dim"}
                                icon="sync"
                                spin={this.state.repeat}
                            />
                        </div>
                        <div className="progressContainer d-flex align-items-center">
                            <span className="text-dim">00:00</span>
                            <div className="progress w-100">
                                <div className="progress-bar" role="progressbar">
                                    <audio></audio>
                                </div>
                            </div>
                            <span className="text-dim">00:00</span>
                        </div>
                    </div>
                    <div className="col-3 pt-3">
                        <div className="playerVolume justify-content-center">
                            <FontAwesomeIcon
                                onClick={() => {
                                    this.setState({ muted: !this.state.muted })
                                }}
                                className="link-dim mx-2"
                                icon={this.state.muted ? "volume-mute" : "volume-up"}
                            />
                            <input
                                onChange={e => {
                                    this.setState({ volume: e.target.value })
                                }}
                                value={this.state.volume}
                                type="range"
                                max="100"
                                min="0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MediaControl
