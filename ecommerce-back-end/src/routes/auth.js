const express = require('express');
const { signup, signin } = require('../controller/auth');
const user = require('../models/user');
const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

// router.post('/profile', requireSignin, (req,res) => {
//     res.status(200).json({
//         message: 'Profile accessed successfully',
//         user: req.user
//     })
// });

module.exports = router;
