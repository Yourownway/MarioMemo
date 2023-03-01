const secondsToMinutesAndSeconds = (seconds:number)  => {
    const time = new Date()
    time.setTime(seconds*1000)
    return `${time.getMinutes()}:${String(time.getSeconds()).padStart(2,'0')}`
}
 

export {secondsToMinutesAndSeconds}