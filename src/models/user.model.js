import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // password hashing ke liye

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true, 
            lowercase: true, // username ko lowercase me store karega
            trim: true, // username ke aage peeche ke spaces ko hata dega
            index: true // username ko index karega taaki search me fast ho
        },
        email: {         //   sbko index nhi denge vrna  performs  kharab ho jayegi
            type: String,
            required: true,
            unique: true, 
            lowercase: true, 
            trim: true, 
        },
        fullname: {
            type: String,
            required: true, 
            trim: true,
            index: true 
        },
        avatar: {
            type: String,    // cloudinary url 
            required: true, 
        },
        coverImage: {
            type: String,    // cloudinary url 
        },
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId, // video ki id
                ref: 'Video', // kis model se refer kar raha hai
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required'], // agar password nahi diya to error aayega
        },
        refreshToken: {
            type: String, // refresh token ko store karne ke liye
        }
    },
    {
        timestamps: true // createdAt and updatedAt fields automatically add karega
    }
)

userSchema.pre("save", async function () {   // we do not arrow function here we do not know the context of here

    if (!this.isModified('password')) return next(); // agar password modify nahi hua to next function call karega
    this.password = bcrypt.hash(this.password, 10 ); // password ko hash karega before saving the user
    next()
} ) 

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function () {
    jwt.sign(
        {
        _id : this.id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        {
        _id : this.id,    // ISME KAM INFORMATION HOTI H IN COMPARISON TO ACCESS TOKEN
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model('User', userSchema);  // (mongoDB me kis naam se save hoga, konse schema ko refer krke user banana h )