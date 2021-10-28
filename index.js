// EXRESS import 
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// ROUT API 
app.get('/', (req, res) => {
    res.send('Tourism server Runing');
});

app.get('/hello', (req, res) => {
    res.send('hello! How are you?');
});

// SERVER Listening
app.listen(port, () => {
    console.log("Yes, Tourism server Runing", port);
});