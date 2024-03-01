const path = require('path');
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        res.render(path.join(__dirname, '../public/admin'));
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
