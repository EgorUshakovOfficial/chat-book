const formatMessage = message => {
    let currentTime = new Date().toString()
    let messDetails = `Chatbot ${currentTime}`.replace(/(\sGMT\-\d{4}\s\(Mountain Daylight Time\))/, "")
    return `<span class="bold">${messDetails}</span><br>${message}`
}

module.exports = formatMessage;
