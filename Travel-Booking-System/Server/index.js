import {PORT} from './config.js';
import express from 'express';

const app = express();
app.get('/', (req,res) => {
    res.send("home route")
})
app.listen(PORT, () => {
    console.log('Server running on PORT', PORT);
})