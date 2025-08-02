import {Project} from '../models/projects.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.utils.js';
const addProject = async(req,res)=>{
    try {
        const { title,description,technologies,githubLink,projectLink,featured } = req.body;
        const data = [title,githubLink,projectLink];
        if (data.some(field => field === undefined || field === null)) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const imageLocalPath = req.file?.path;
        console.log(`imageLocalPath : ${imageLocalPath}`)
        if(!imageLocalPath){
            console.error("Image file is required");
        }

        const image = await uploadOnCloudinary(imageLocalPath);
        if(!image){
            return res.status(500).json({ message: 'Image upload to cloudinary failed' });
        }
        const project = await Project.create({
            title,
            description,
            image: image.url,
            technologies: technologies,
            githubLink,
            projectLink,
            featured: featured || false
        });
        res.status(200)
        .json({
            message: "Project created successfully",
            project: project
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const updateProject = async (req, res) => {
  try {
    // Parse technologies if needed
    if (req.body.technologies) {
      try {
        req.body.technologies = JSON.parse(req.body.technologies);
      } catch (e) {
        console.log("Invalid technologies format");
        req.body.technologies = [];
      }
    }

    // Handle image if multer is used
    if (req.file) {
      req.body.image = req.file.path; // or req.file.location if using Cloudinary/S3
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: 'Project updated successfully',
      project: updated,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};



const updateProjectImage = async(req, res) => {
    const imageLocalPath = req.file?.path

    if (!imageLocalPath) {
        throw new ApiError(400, "Image file is missing")
    }


    const image = await uploadOnCloudinary(imageLocalPath)

    if (!image.url) {
        throw new ApiError(400, "Error while uploading on Cloudinary")
        
    }

    const project = await Project.findByIdAndUpdate(
        req.params.id,
        {
            $set:{
                image: image.url
            }
        },
        {new: true}
    )

    return res
    .status(200)
    .json(project)
}

const deleteProject = async(req,res)=>{
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200)
        .json({
            message: "Project deleted successfully",
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getAllProjects = async(req,res)=>{
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export {
    addProject,
    updateProject,
    deleteProject,
    getAllProjects,
    updateProjectImage
}