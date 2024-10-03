import express from 'express'
import { login, register } from '../controllers/auth'

//Variables
const router = express.Router()

//Router functions
router.route('/register').post(register)
router.route('/login').post(login)

//Router configurations
export default router