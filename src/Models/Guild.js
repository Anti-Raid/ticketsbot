const {model, Schema} = require("mongoose")

const schema = new Schema({
    guildID: String,
    TicketCategoryID: String,
    StaffRoleID: String,
    LogChannelID: String,
})

module.exports = model("guilds", schema)