const router = require('express').Router();
const { auth } = require('../../middleware/middleware.auth.js');

router.get('/user_profile', auth(['admin']), (req, res) => {
    res.json({ message: 'This is the user profile: admin.' });
});

module.exports = router;