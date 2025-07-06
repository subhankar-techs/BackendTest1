//loading the express
const express = require('express');
const cors    = require('cors');
const mysql   = require('mysql');

const env     = require('dotenv').config();

const port    = process.env.PORT;
const host    = process.env.HOST


const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const app = express();
app.use(cors());

//incoming post require configured.
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("<h1>Welcome to Express</h1>");
})
//use of userRouter
app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.listen(port,host,()=>{
    console.log(`Express server has started at http://${host}:${port}/`);
})
