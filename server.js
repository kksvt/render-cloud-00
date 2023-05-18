var express = require('express');
var bodyParser = require('body-parser');
var users = require("./userDatabase");

var app = express();

// var parser = bodyParser.urlencoded();
var parser = bodyParser.json();

app.use(parser);

app.use(express.static('public'));

app.get('/users', function(req, res) {
    users.getUsers((err, data) => {
        console.log("data: ", data);
        res.end(JSON.stringify(data));
    });
})

app.get('/add_user', function(req, res) {
    console.log(req.body);
    users.addUser(req.query.last_name, req.query.first_name);
    res.end("User added");
})
/*
app.get('/profile', function(req, res) {
    console.log(req.body);
    console.log(req.query);
    users.getUsers((err, data) => {
        if (req.query['user'] === undefined || req.query['user'] === null || req.query['user'].length == 0) {
            res.end('No username specified.');
            return;
        }
        const use_last_name = req.query['last_name'] !== undefined && 
            req.query['last_name'] !== null && 
            req.query['last_name'].length > 0;
        const user = data.find(
            (u) => u.first_name === req.query['user'] &&
             (!use_last_name || u.last_name == req.query['last_name'])
            );
        if (user === undefined || user === null) {
            res.end('Invalid username.');
            return;
        }
        res.end(user.first_name + ' ' + user.last_name);
    });
});
*/

app.get('/profile', function(req, res) {
    res.sendFile('public/profile.html', {root: __dirname });
});

const PORT = process.env.PORT || 8080;

const listener = app.listen(PORT, 
	() => console.log(`Listening on ${ listener.address().port }`));

