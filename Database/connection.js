const { connect, set } = require('mongoose');
const config = require('../config.json')

async function connectToDatabase() {
    try {
        let mongo_link = config.mongo;
        if(!mongo_link)return;
        await connect(mongo_link, {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(async(connection) => {
            await console.log(`🟢 | MongoDB connected as ${connection.connections[0].name}`)
        })
    } catch (error) {
        console.log(`🔴 | Unable to connect to MongoDB!`)
        console.error(error)
    }
}

module.exports = connectToDatabase;