export const formatMessage = (firstName, lastName, message) => {
    let currentTime = new Date().toString()
    let fullName = `${firstName} ${lastName}` 
    let messDetails = `${fullName} ${currentTime}`.replace(/(\sGMT\-\d{4}\s\(Mountain Daylight Time\))/, "")
    return `<span class="bold">${messDetails}</span><br>${message}`
}

export default formatMessage; 
