const express = require('express');
const app = express();
const router = require('./routes/movies.js');
const morgan = require('morgan')


app.use(router);
app.use(express.json());


//loggin middleware
app.use(morgan('common'))

//error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        error: err
    })  
});

app.listen(3000);