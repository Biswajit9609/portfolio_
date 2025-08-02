import mongoose,{Schema} from 'mongoose';
const codesSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type: String,
    },
    language:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    featured:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})
export const Code = mongoose.model('Code',codesSchema);