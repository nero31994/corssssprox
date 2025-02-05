const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).json({ error: 'Missing URL parameter' });

    try {
        const response = await fetch(targetUrl);
        const data = await response.arrayBuffer();
        res.status(200).send(Buffer.from(data));
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CORS Proxy running on port ${PORT}`));
