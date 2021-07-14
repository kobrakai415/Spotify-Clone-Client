export const durationCalculator = (durationInMilliseconds) => {
    let duration = durationInMilliseconds
    let mins = Math.floor(duration / 60000)
    let secs = ((duration % 60000) / 1000).toFixed(0)
    return mins + ":" + (secs < 10 ? '0' : '') + secs
}

export const formatTime = (duration) => {
    let minutes = Math.floor(duration / 60);
    minutes = (minutes >= 1) ? minutes : minutes;
    let seconds = Math.floor(duration % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
}