const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

// routes will go here

app.get('/api/users', function(req, res) {
    const user_id = req.query.id;
    const token = req.query.token;
    const geo = req.query.geo;

    res.send({
        'user_id': user_id,
        'token': token,
        'geo': geo
    });
});

app.get('/api/:version', function(req, res) {
    res.send(req.params.version);
});

app.param('name', function(req, res, next, name) {
    const modified = name.toUpperCase();

    req.name = modified;
    next();
});

// routes will go here
// ...

app.get('/api/usersy/:name', function(req, res) {
    res.send('Hello ' + req.name + '!');
});  

app.listen(port);
console.log('Server started at http://localhost:' + port);