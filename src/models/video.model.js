import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new mongoose.Schema( 
    {
        videoFile: {
            type: String, // cloudinary url 
            required: true, // videoFile required hai
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true, // video ki duration required hai
        },
        videoUrl: {
            type: String, // cloudinary url 
            required: true,
        },
        thumbnailUrl: {
            type: String, // cloudinary url 
            required: true,
        },
        views: {
            type: Number,
            default: 0, // default value 0 hogi
        },
        isPublished: {
            type: Boolean,
            default: true, // default value false hogi
        },
        owner: {
            type: Schema.Types.ObjectId, 
            ref: 'User', 
        },
        likes: {
            type: Number,
            default: 0, // default value 0 hogi
        },
        dislikes: {
            type: Number,
            default: 0, // default value 0 hogi
        },
        userId: { // kis user ne video upload kiya hai
            type: mongoose.Schema.Types.ObjectId, // user ki id
            ref: 'User', // kis model se refer kar raha hai
            required: true, // userId required hai
        }
    }, 
    {
        timestamps: true // createdAt and updatedAt fields automatically add karega 
    }
)

videoSchema.plugin(mongooseAggregatePaginate); // plugin for pagination

export const Video = mongoose.model('Video', videoSchema); 