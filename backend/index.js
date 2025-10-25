require('dotenv').config();
const express = require('express');
const cors = require('cors');
const DBConnect = require('./config/dbConnection')

const server = express();

DBConnect();

server.use(express.json());
server.use(cors());

PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`server connected to PORT ${PORT}`);
})

server.get('/', (req, res) => {
    res.json({serverStatus: "Server running succesfully"})
})