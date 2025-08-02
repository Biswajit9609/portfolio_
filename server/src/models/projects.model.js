import mongoose,{Schema} from 'mongoose';
const projectSchema = new Schema({
    title:{
        type: String,
        required : true,
    },
    description:{
        type: String,
    },
    image:{
        type: String,
        required: true
    },
    technologies:[
        String
    ],
    githubLink:{
        type: String,
        required : true,
    },
    projectLink:{
        type: String,
        required : true,
    },
    featured:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

export const Project = mongoose.model('Project',projectSchema)