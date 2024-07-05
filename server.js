const express = require('express');
const scrapeData = require('./scraper');
const app = express();
const port = 8000;

app.get('/api/gpus', async (req, res) => {
    try {
        let data = await scrapeData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
