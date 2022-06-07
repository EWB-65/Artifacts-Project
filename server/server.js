const express = require('express')
const server = express()
const port = 5000
const test = require('./routes/test');
const cors = require("cors");

server.use(cors())

server.use("/test", test)

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})