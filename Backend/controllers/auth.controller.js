// const express = require('express')
const userModel = require('../models/user.model')
const blacklistTokenModel = require('../models/blackList.Token')
const authMiddleware = require('../middlewares/auth.middleware')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const cookie = require('cookie-parser');

async function registerUserController(req, res){

    const{username,email,password} = req.body

    if(!username||!password||!email) {
        return res.status(400).json({
            message: "All fields are required"
        })
    };

    const userAlreadyExists = await userModel.findOne({
        $or:[{email}, {username}]
    })

    if(userAlreadyExists){
        return res.status(400).json({
            message: "User with this email or username already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)
    
    const user = await userModel.create({
        username,
        email,
        password: hash,
    })

    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User created",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

async function loginUserController(req, res) {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    )

    res.cookie("token", token)
    res.status(200).json({
        message: "User logged-in successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function logOutUserController(req, res) {
    const token = req.cookies.token

    if(token){
        await blacklistTokenModel.create({ token })
    }
    res.clearCookie("token")

    res.status(200).json({
        message: "User Loggedout successfully"
    })
}

async function getMeController(req,res) {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        message: "User fetched Successfully",
        user:{
            id: user.id,
            username: user.username,
            email: user.email
        }
        
    })
}

module.exports = {registerUserController, loginUserController, logOutUserController, getMeController}