const express = require("express");
const mongoose = require("mongoose")
const config = require("config")
const winston = require("winston");
require('winston-mongodb')
require('express-async-errors')
const app = express();
const error = require("./middleware/error");
const user = require("./routes/user");
const blog = require('./routes/blog')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(error);
app.use("/user", user);
app.use("/blog", blog)

mongoose.connect(config.get('MONGOURI'), { useNewUrlParser: true, useUnifiedTopology: true}).then(() =>  winston.info('Connected to database'))

winston.add( winston.createLogger({
    exceptionHandlers: [
        new winston.transports.Console({level: 'info', format: winston.format.combine(winston.format.colorize(), winston.format.simple(), winston.format.prettyPrint(), winston.format.json())}),
        new winston.transports.File({filename: 'exception.log'}),
    ]
}))
    
process.on('unhandledRejection', (ex) => {
    
    throw ex
})

const file = new winston.transports.File({ filename: 'logfile.log', format: winston.format.json() },)
const console = new winston.transports.Console( {level: 'info', format: winston.format.combine(winston.format.colorize(), winston.format.simple())})
const db = new winston.transports.MongoDB({ db: config.get('MONGOURI'), useNewUrlParser: true, useUnifiedTopology: true, level: 'info'})

winston.add(file)
winston.add(db)
winston.add(console)

if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: JWTSECRETTOKEN IS NOT DEFINE')
    
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  winston.info(`Listening on port ${3000}`);
});
