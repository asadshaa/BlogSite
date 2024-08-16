const express = require('express');
const router = express.Router();
const db = require('../Config/configblogDb');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM userstable WHERE Email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).send({ success: false, message: 'Invalid email or password' });
        }

        const user = rows[0];
        
        if (password !== user.Password) {
            return res.status(401).send({ success: false, message: 'Invalid email or password' });
        }

        req.session.userId = user.Id;
        res.redirect('/home'); 

    } catch (error) {
        console.log('Error in login', error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;