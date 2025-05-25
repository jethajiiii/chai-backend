import express  from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}))

app.use(express.json({limit: '16kb'}))  // accepting json directly from express
app.use(express.urlencoded({extended: true, limit: '16kb'}))  // url has its own encoder like ==> mukul+bhardwaj  or  mukul%20bhardwaj
app.use(express.static('public'))  // to store file and folders which are accessible to public(everyone)
app.use(cookieParser()) // to  access and perform crud operation on cookies


// routes
import userRoutes from './routes/user.routes.js'    

// routes declaration
app.use('/api/v1/users', userRoutes)  //  '/api/v1/users' ==> ispe jaane k baad userRoutes activate ho jayega ==> uske baad /register lgega fir registerUser function call ho jayega ==>fir uke baad message response mil jayega  

// http://localhost:8000/api/v1/users/register 
export default app