const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already registered!'
            });
        }

        // Create new user
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString()
        });

        // Save user to database
        const savedUser = await _user.save();
        
        return res.status(201).json({
            message: 'User created successfully',

        });

    } catch (error) {
        console.error('Signup error:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationErrors
            });
        }
        
        // Handle duplicate key errors (email/username already exists)
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                message: `${field} already exists`
            });
        }
        
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        });
    }
}

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }

        // Authenticate password
        if (user.authenticate(password)) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const { _id, firstName, lastName, email, role } = user;
            
            return res.status(200).json({
                token,
                user: {
                    _id,
                    firstName,
                    lastName,
                    email,
                    role,
                    fullName: user.fullName
                }
            });
        } else {
            return res.status(400).json({
                message: 'Invalid password'
            });
        }

    } catch (error) {
        console.error('Signin error:', error);
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        });
    }
}





     
