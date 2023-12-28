const {model , Schema} = require('mongoose')

let LevelSchema = new Schema({
    Guild : Schema.Types.String,
    User : Schema.Types.String,
    XP : {
        type : Schema.Types.Number,
        default : 0
    },
    LEVEL : {
        type : Schema.Types.Number,
        default : 0
    },

})

module.exports = model("mike_Level" , LevelSchema)