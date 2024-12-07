import express from 'express'
import { userRoutes } from './routes/user.routes.js'

const router = express.Router()

router.use('/user',userRoutes)

export {router}