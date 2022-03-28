const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const app = express();

app.get("/events", async (req, res) => {
    const events = await fs.readFile(path.join(__dirname, "data", "dummy-data.json"));
    const jsonData = JSON.parse(events);
    return res.json(jsonData);
});

app.listen(4000, () => console.log("listing on 8000..."));