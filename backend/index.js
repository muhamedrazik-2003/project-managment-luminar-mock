require('dotenv').config();
const express = require('express');
const cors = require('cors');
const DBConnect = require('./config/dbConnection');
const projectRoutes = require('./routes/projectRoutes');

const server = express();

DBConnect();

server.use(express.json());
server.use(cors());

server.use('/api/projects', projectRoutes);

PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`server connected to PORT ${PORT}`);
})

server.get('/', (req, res) => {
    res.json({serverStatus: "Server running succesfully"})
})