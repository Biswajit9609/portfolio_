import { Router } from "express";
import {
    addProject,
    updateProject,
    deleteProject,
    getAllProjects,
    updateProjectImage
} from "../controllers/projects.controller.js"
import {upload} from "../middlewares/multer.middleware.js";


const projectRouter = Router();

projectRouter.route('/').get(getAllProjects);
projectRouter.route('/add-project').post(upload.single('image'),addProject);
projectRouter.route('/update/:id').put(updateProject);
projectRouter.route('/delete/:id').delete(deleteProject);
projectRouter.route('/update-image/:id').put(upload.single('image'),updateProjectImage);

export default projectRouter;