const User = require('./../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')


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
        const token = jwt.sign({userId: newUser._id}, `${process.env.SECRET_KEY}`)

        // data saved successfully
        res.status(201).json({newUser, token})

    }
    catch (e) {

        res.status(403).json({message: e.message})

    }
}

module.exports = { registerUser }