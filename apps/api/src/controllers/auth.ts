import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { match } from 'assert'
import { error } from 'console'

//Variables
const users: Array<User> = []

//Functions
export function getUser(username): User | null {
    return users.find(item => item.username === username)
}

export const register = (req, res) => {
    const {username, password} = req.body
    if(username && password){
        const duplicated = users.find(item => item.username == username)
        if(duplicated){
            return res.status(400).json({message: 'Username already exist'})
        }
            bcrypt.hash(password,10, function (err, hashPassword) {
                if(hashPassword){
                    users.push({username, password: hashPassword})
                    res.status(201).json({username})
                } else {
                    return res.status(500).json(err)
                }
            })
    } else {
        if(!username){
            return res.status(400).json({message: 'Username is required'})
        }
        if(!password){
            return res.status(400).json({message: 'Password is required'})
        }
    }
}

export const login = (req, res) => {
    const {username, password} = req.body
    if(username && password){
        const user = getUser(username)
        if(!user){
            return res.status(401).json({message: 'Invalid credentials'})
        } else {
            bcrypt.compare(password,user.password.toString(), function(err, result){
                if(result){
                    const accessToken = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
                    const refreshToken = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
                    res.cookie('refreshToken',refreshToken, {
                        httpOnly: true,
                        maxAge: 1*24*60*60*1000 
                    });
                    res.status(200).json({accessToken})
                } else {
                    return res.status(401).json({message: 'Invalid credentials'})
                }
            })
        }
    } else {
        if(!username){
            return res.status(400).json({message: 'Username is required'})
        }
        if(!password){
            return res.status(400).json({message: 'Password is required'})
        }
    }
}

export const logout = (req, res) => {

}

export const refresh = (req, res) => {

}