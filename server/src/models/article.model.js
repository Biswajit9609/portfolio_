import mongoose, { Schema } from 'mongoose';
const articleSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    excerpt:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    featured:{
        type : Boolean,
        default: false
    }
},{
    timestamps: true,
})
export const Article = mongoose.model('Article',articleSchema);