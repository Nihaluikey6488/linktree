import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookirParser from 'cookie-parser'

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookirParser());

export default app;
