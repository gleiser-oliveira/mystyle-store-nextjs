const cookieParser = require('cookie-parser');
const createServer = require('./createServer');
const jwt = require('jsonwebtoken');
const server = createServer();

function addCORSHeadersToPreflight(req, res) {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.end();
}

function addCORSHeadersToResponse(req, res, next) {
    next();
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
}

decodeToken = (req, res, next) => {
    const {token} = req.cookies;

    if(token) {
        const {userId} = jwt.verify(token, process.env.MY_STYLE_APP_SECRET);

        req.userId = userId;
    }

    next();
}

// middleware to add addCORSHeadersToPreflight
server.express.options('/*', addCORSHeadersToPreflight);
// middleware to handle JWT
server.express.use(cookieParser());
// middleware to decode JWT token
server.express.use(decodeToken);
// middleware to add addCORSHeadersToResponse
server.express.use('/*', addCORSHeadersToResponse);

server.start({
    cors: {
        orgin: process.env.FRONTEND_URL,
        credentials: true,
    },

}, deets => {
    console.log(`Running on: http://localhost:${deets.port}`);
})