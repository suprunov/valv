const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.get('/api/services', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, 'data/services.json'), 'utf-8');
    res.json(JSON.parse(data));
});

app.get('/api/services/:key', (req, res) => {
    const filePath = path.join(__dirname, 'data', `${req.params.key}.json`);
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        res.json(JSON.parse(data));
    } else {
        res.status(404).json({ error: 'Service not found' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Backend server is running on http://localhost:${PORT}`);
});
