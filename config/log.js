const winston = require('winston')

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            level:'info'
        }),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error'
        })
    ]
})

module.exports = logger