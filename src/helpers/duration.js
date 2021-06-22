export const durationCalculator = (durationInMilliseconds) => {
    let duration = durationInMilliseconds
    let mins = Math.floor(duration/60000)
    let secs = ((duration % 60000) / 1000).toFixed(0)
    return mins + ":" + (secs < 10 ? '0' : '') + secs
}