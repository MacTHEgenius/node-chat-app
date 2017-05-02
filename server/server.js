const path = require('path');
const express = require('express');

// Configure

const publicPath = path.join(__dirname, '../public');

var router = express();
router.use(express.static(publicPath));

// Listening...

const port = process.env.PORT || 3000;
const ip = process.env.IP;
router.listen(port, ip, () => {
    console.log(`Started at ${process.env.IP}:${process.env.PORT}`);
});