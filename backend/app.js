const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()
const cookieParser = require('cookie-parser');

app.use(cookieParser());
require('dotenv').config()

const PORT = 5000
//middlewares
app.use(express.json())
app.use(cors())
//routes
readdirSync('./routes').map((route) => app.use('/api', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()