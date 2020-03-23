import bodyParser from 'body-parser';
import express from 'express';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
import db from './db/db';
import { getNearestPlaces } from './model/places';
import { getUserByEmail } from './model/user';
import { verifyJWT } from './util/jwt_util';

// Set up the express app
const app = express();
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/login', async (req, res) => {
    console.log('request', req.body);
    let creds = req.body.email && req.body.password;
    if (!creds)  return res.status(403).send('Email Id or Password invalid');

    let email = req.body.email;
    console.log('req email', email);
    // See if this email exist in DB
    let user = await getUserByEmail(email);
    if (user instanceof Error) {
        return res.status(500).send('Error on the server.');
    }

    if (user.length == 0) {
        return res.status(401).send({ auth: false, token: null });
    }
    console.log('user---', user);
    if (user[0].password !== req.body.password) {
        return res.status(401).send({ auth: false, token: null });
    }
    let token = jwt.sign({ id: user.email }, 'somesecretammulakka', {
        expiresIn: '30m' // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });

    // res.cookie('cokkieName',token, { httpOnly: true });
});

app.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});


// get all todos
app.get('/api/v1/todos',verifyJWT, (_req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db
    })
});


app.get('/api/v1/places', async (req, res) => {

    if(!req.query.rad) {
        return res.status(400).send({
            success: 'false',
            message: 'radius is required'
        });
    }
    else if(!req.query.lat) {
        return res.status(400).send({
            success: 'false',
            message: 'latitude is required'
        });
    } else if(!req.query.long) {
        return res.status(400).send({
            success: 'false',
            message: 'longitude is required'
        });
    }

    let nearest = await getNearestPlaces(req.query.rad, req.query.lat, req.query.long) 
    res.status(200).send({
        success: 'true',
        message: 'nearest places retrieved successfully',
        total: nearest.length,
        places: nearest
    })
});

app.post('/api/v1/todos',verifyJWT, (req, res) => {
    if(!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    } else if(!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }
    const todo = {
        id: db.length + 1,
        title: req.body.title,
        description: req.body.description
    }
    db.push(todo);
    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        todo
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});