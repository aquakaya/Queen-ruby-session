const express = require('express');
const app = express();
__path = process.cwd()
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
let server = require('./DevAskqr'),
    code = require('./DevAskpair');
require('events').EventEmitter.defaultMaxListeners = 500;
app.use('/code', code);
app.use('/DevAskqr',async (req, res, next) => {
res.sendFile(__path + '/qr.html')
})
app.use('/DevAskpair',async (req, res, next) => {
res.sendFile(__path + '/pair.html')
})
app.use('/',async (req, res, next) => {
res.sendFile(__path + '/DevAskpage.html')
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log(`
Don't Forget To Give Star

 Server running on http://localhost:` + PORT)
})

module.exports = app
/**
    powered by Dev Ask
    **/