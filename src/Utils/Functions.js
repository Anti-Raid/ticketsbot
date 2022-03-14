module.exports = {
    capitalize: (string) => {
        return string.toLowerCase()
        .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
        .replace(/_/g, ' ');
    }
}