// require('dotenv').config({path: './env'})
import  dotenv from 'dotenv'

import mongoose from 'mongoose'
import { DB_NAME } from './constants.js'
import { error } from 'console'
import connectDB from './db/index.js'
import path from 'path'

// function connectDB(){ 
// }

dotenv.config({path:'./env'})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () =>  {
        console.log(`server is running at port ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log('MONGODB connection failed', error)
})

































// import express from 'express'
// const app = express()

// (async () => {
//     try {
//        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//        app.on('error', () => {
//         console.log('Error', error)
//         throw error
//        })

//        app.listen(process.env.PORT, () => {
//         console.log(`app is listening at port ${process.env.PORT}`)
//        })
//     }catch(error){
//         console.error('ERROR:', error)
//         throw error
//     }
// })()