import express from "express"
import "dotenv/config"
import {ENV} from './config/env.js'
const app=express();
const PORT=ENV.PORT ||8001

app.get("/api/health",(req,res)=>{
    res.status(200).json({success:true});
})

app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);

})