// server.mjs
const http = require('http')
const dotenv = require('dotenv')

dotenv.config()
const app = require('./app')

const server = http.createServer(app)

const PORT = process.env.PORT
server.listen(3000, ()=>{
    console.log(`Server listening on port ${PORT}`)
})
