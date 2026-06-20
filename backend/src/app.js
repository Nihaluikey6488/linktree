import dotenv from 'dotenv'
dotenv.config()
import express from  'express'

let app=express()
app.use(express.json())

export default app