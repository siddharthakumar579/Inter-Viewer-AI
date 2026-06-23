const mongoose = require('mongoose')

const blackListTokenSchema = mongoose.Schema({
    token:{
        type: String,
        required: [true, "token is required to blacklist"]

    }
},{
    timestamps:true
})

module.exports = mongoose.model( "blacklistTokens", blackListTokenSchema)