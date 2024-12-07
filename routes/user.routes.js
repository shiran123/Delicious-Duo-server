import express from 'express'
import { connectToDB } from '../utilities/database.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import {query,validationResult,body,matchedData,checkSchema} from 'express-validator'
import { loginValidationSchema, registrationValidationSchema } from '../utilities/validationSchemas.js'

const userRoutes = express.Router()

connectToDB()

userRoutes.get('/test',(req,res) => {
    res.json({message:"Hi..."})
})

userRoutes.post('/registration',checkSchema(registrationValidationSchema),async (req,res) => {

    const result = validationResult(req)

    if(!result.isEmpty())
    {
        return res.status(400).send({errors:result.array()})
    }

    const data = matchedData(req)

    const {name,address,telephone,email,password} = data

    User.findOne({email})
    .then(async (user)=>{
        if(!user)
        {
            try {
                let usr = await User.create({name,address,telephone,email,password,refreshToken:""})
                return res.status(200).json(usr)
            } catch (error) {
                return res.status(400).json(err)
            } 
        }
        return res.status(400).json({message:'email available'})    
    })
    .catch((err)=>{
        return res.status(400).json({error:err})
    })

})

userRoutes.post('/login',checkSchema(loginValidationSchema),async (req,res) => {

    const result = validationResult(req)

    if(!result.isEmpty())
    {
        return res.status(400).send({errors:result.array()})
    }

    const data = matchedData(req)

    const {email,password} = data
    let usr = await User.findOne({email})
    try {
        if(usr)
        {
            let flag = await usr.comparePassword(password)
            if(flag)
            {
                const accessToken =jwt.sign({email:email},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:'1m'})
                const refreshToken =jwt.sign({email:email},process.env.REFRESH_TOKEN_SECRET_KEY,{expiresIn:'5m'})
                await User.updateOne({_id:usr._id},{ $set: { refreshToken} })
                usr = {...usr,accessToken}
                res.cookie('refreshToken',refreshToken,{maxAge:5*60*1000,httpOnly:true,secure:true,sameSite:'strict'})
                return res.status(200).json({user: usr, message : 'Login successfull'})
            }
            else
            {
                return res.status(401).json({user: usr, message : 'Please enter the correct password'})
            }
        }
        return res.status(404).json({user: usr, message : 'User not found'})
    } catch (error) {
        return res.status(400).json({user: usr, message: 'Error on login'})
    }

})

userRoutes.post('/home',(req,res)=>{
    console.log('req --> ',req)
    return res.status(200).json({message : 'Wellcome to home...!'})
})

export {userRoutes}