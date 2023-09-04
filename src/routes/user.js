const express = require('express')
const {User, validateUserLogin, validateUserRegistration} = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/', auth, async (req, res) => {

    const users = await User.find().catch(err => console.log(err.message))
    res.json({data: users})
})

router.get('/:id', auth ,async (req, res) => {

    const user = await User.findById(req.params.id).catch((err) => console.log(err.message))

    if (!user) return res.status(404).send('No User with the given Id')
    
    res.json({data: _.pick(user, ['_id', 'email', 'username'])})
})

router.post('/login', async (req, res) => {

    const { error } = validateUserLogin(req.body)
    
    if (error) return res.status(400).json({error: error.details[0].message})

    let user = await User.findOne({ email: req.body.email }).catch(err => console.log(err.message))
    if(!user) return res.status(400).json({error: 'Invalid login details'})
    
    const validatePassword = await bcrypt.compare(req.body.password, user.password)
    if (!validatePassword) return res.status(400).json({error: 'Invalid login details'})

    const token = await user.generateToken()
    
    res.header('x-auth-token', token).json({message:'Login Successfully'})
})

router.post('/signup', async (req, res) => {

    const { error } = validateUserRegistration(req.body)
    
    if (error) return res.status(400).send(error.details[0].message)

    const email = await User.findOne({ email: req.body.email }).catch(err => console.log(err.message))
    if(email) return res.status(400).json({error: 'User with the given email exist'})
    
    let user = new User({username: req.body.username, email: req.body.email, password: req.body.password})


    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt)
    user.password = password
    await user.save()
    const token = await user.generateToken()
    res.header('x-auth-token', token).json({data: _.pick(user, ['_id', 'email', 'username'])})
    
})

router.delete('/:id', auth, async (req, res) => {

    const user = await User.findByIdAndRemove(req.params.id).catch(err => console.log(err.message))

    if (!user) return res.status(404).json({error: 'No User with given Id'})
    
    res.json({data: _.pick(user, ['_id', 'email', 'username'])})
})

module.exports = router