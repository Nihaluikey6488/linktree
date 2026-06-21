import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookirParser from 'cookie-parser'
import authRoutes from "./routes/auth.routes.js"
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookirParser());

app.use("/api/auth",authRoutes)
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
