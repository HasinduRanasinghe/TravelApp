const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');


// Register new user
exports.userRegister = async(req, res) => {
    console.log("Received a registration request:", req.body);
    try {
        let newUser = new userModel(req.body)
        newUser.save()
        return res.send({
            success: true,
            message: 'User created successfully, please login',
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    };
};

// Login a user
exports.userLogin = async(req, res) => {
    try {
        const { emailAddress, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ emailAddress });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User does not exist',
            });
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).send({
                success: false,
                message: 'Invalid password',
            });
        }

        // create and assign a token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
            expiresIn: "1d",
        });

        return res.send({
            success: true,
            message: 'Login successful',
            data: token,
        });
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

// get logged in user details
exports.getLoggedinUser = async(req, res) => {
    try {
        const user = await userModel.findById(req.body.userIdFromToken);
        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist",
            });
        }
        return res.send({
            success: true,
            message: "User details fetched successfully",
            data: user,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }

};

// get user by id
exports.getUserById = async(req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist",
            });
        }
        return res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        });

    } catch (error) {
        return res.send({
            success: false,
            message: 'User does not exist',
        });
    }
};

exports.getUserByEmail = async(req, res) => {
    try {
        const email = req.params.email; // Assuming the email is passed as a parameter

        const user = await userModel.findOne({ emailAddress: email }); // Assuming the email field in your model is named 'emailAddress'

        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist",
            });
        }

        return res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: 'An error occurred while fetching the user',
        });
    }
};