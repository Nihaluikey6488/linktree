import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.routes.js"
import linkRoutes from './routes/link.routes.js'
import cors from "cors"

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/api/auth",authRoutes)
app.use("/api/links",linkRoutes)
app.use((err,req,res,next)=>{

console.log("error",err)
    let statusCode=err.status || 500
    let message=err.message || "Internal server error"
    res.status(statusCode).json({
        message:message
    }) 
}
)
export default app;
