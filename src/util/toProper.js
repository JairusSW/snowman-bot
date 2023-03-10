function toProperCase(data) {
    return data.replace(/([^\W_]+[^\s-]*) */g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    });
}

module.exports = toProperCase