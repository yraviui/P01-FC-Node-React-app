import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoute.js'

// PORT
const PORT = process.env.PORT || 8080

// configure env
dotenv.config()

// database config
connectDB()

// rest object
const app = express()

// cors
app.use(cors())

// middlewares
app.use(express.json())

// rest api for testing
app.get('/api', (req, res) =>{
    res.send({ message: 'Welcome to FS App - API Testing'})
})

// all users
app.use('/api/v1/', userRoutes) 

// run listen
app.listen(PORT, () => console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white))