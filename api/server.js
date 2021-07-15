const express = require("express");
const cors = require("cors");
const accountRouter = require('./accounts/accounts-router');

const server = express();

server.use(express.json());
server.use(cors() );

server.use("/api/accounts", accountRouter);

const page404 = (req, res, next) => {
    res.status(404).json({
        message: "That endpoint is not implemented on this server."
    })
    next();
}

const errorHandling = (err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        message: err.message
    })
    next();
}

server.use('*', page404);
server.use(errorHandling);

module.exports = server;