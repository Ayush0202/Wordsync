const User = require('./../models/user')
const Document = require('../models/documentSchema')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')


// creating jwt token
const createToken = (_id) => {
    // return jwt.sign({_id}, process.env.SECRET_KEY, {expiredIn: '3d'})
    return jwt.sign({_id}, process.env.SECRET_KEY)
}

// registering new user
const registerUser = async (req, res) => {

    // getting user from client
    const user = req.body

    try {
        // validating user data

        // all fields must be filled
        if(!user.firstName || !user.lastName || !user.email || !user.password) {
            return res.status(401).json({message: 'All fields must be filled'})
        }

        // checking for existing user
        const existingUser = await User.findOne({email: user.email})
        if(existingUser) {
            return res.status(401).json({message: 'User already exists'})
        }

        // checking if email is in correct format
        const checkEmail = user.email
        if(!validator.isEmail(checkEmail)) {
            return res.status(401).json({message: 'Invalid email'})
        }

        // checking if password has length of at least 5
        const passwordLength = user.password.length
        if(passwordLength < 5) {
            return res.status(401).json({message: 'Password to small'})
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(user.password, 10)

        // no problem found in user
        // proceed to save data in database

        // saving data to database
        const newUser = new User({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword
        })

        await newUser.save()

        // creating token using json web tokens
        const token = createToken(newUser._id)

        // data saved successfully
        return res.status(201).json({newUser, token})

    }
    catch (e) {

        return res.status(403).json({message: e.message})

    }
}


// login user
const loginUser = async (req, res) => {

    const user = req.body

    try {

        // login fields are empty
        if(!user.email || !user.password) {
            return res.status(401).json({message: 'All fields must be filled'})
        }

        // finding user with given email
        const checkUser = await User.findOne({email: user.email})

        // if user is not present
        if(!checkUser) {
            return res.status(401).json({message: 'Invalid email or password'})
        }

        // user present
        // compare password
        const isPasswordValid = await bcrypt.compare(user.password, checkUser.password)

        // passwords do not match
        if(!isPasswordValid) {
            return res.status(401).json({message: 'Invalid email or password'})
        }

        // password is correct
        // generate jwt token with user Id as payload
        const token = createToken(checkUser._id)

        // return token to client
        res.json({checkUser, token})

    }
    catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})

    }
}


// deleting user
const deleteUser = async (req, res) => {
    try {

        // getting user id of the user
        const userId = req.user._id

        // delete all document that have been created by the user
        const deleteUserDocuments = await Document.deleteMany({userId: userId})

        // deleting user from database
        const deleteUserDetails = await User.deleteOne({_id: userId})

        res.status(200).json({message: 'User Deleted Succesfully'})

    } catch (e) {
        // error in deleting user
        res.status(500).json({message: e.message})

    }
}


module.exports = { registerUser, loginUser, deleteUser }