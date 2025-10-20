const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(express.static(__dirname));

const visitorsFilePath = path.join(__dirname, 'visitors.json');

// Endpoint to serve the admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Endpoint to get visitor data
app.get('/api/visitors', (req, res) => {
    fs.readFile(visitorsFilePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error(err);
            return res.status(500).send({ message: 'Error reading visitors file' });
        }
        const visitors = data ? JSON.parse(data) : [];
        res.json(visitors);
    });
});

// Endpoint to save visitor's name
app.post('/api/visitor', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send({ message: 'Name is required' });
    }

    fs.readFile(visitorsFilePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error(err);
            return res.status(500).send({ message: 'Error reading visitors file' });
        }

        const visitors = data ? JSON.parse(data) : [];
        visitors.push({ name, ip: req.ip, timestamp: new Date().toISOString() });

        fs.writeFile(visitorsFilePath, JSON.stringify(visitors, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ message: 'Error saving visitor' });
            }
            res.status(201).send({ message: 'Visitor saved' });
        });
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});