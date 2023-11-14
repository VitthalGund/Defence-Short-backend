const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
require("dotenv").config()
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// custom middleware logger to log events in log directory
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// set a cookie
app.use(function (req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        // no: set a new cookie
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully');
    } else {
        // yes, cookie was already present 
        console.log('cookie exists', cookie);
    }
    next(); // <-- important!
});


//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/sendmail', require("./routes/email")); //TODO
app.use(verifyJWT);
app.use('/contact', require('./routes/contact'));
app.use('/users', require('./routes/api/users'));
app.use('/userinfo', require('./routes/usersInfo'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);
mongoose.connection.addListener("connected", () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
        console.log(`http://localhost:${PORT}`)
    });
});