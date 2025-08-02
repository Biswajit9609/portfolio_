import { Router } from "express";
import {
    addCode,
    updateCode,
    deleteCode,
    getAllCodes
} from "../controllers/codes.controller.js"

const codeRouter = Router();

codeRouter.route('/').get(getAllCodes);
codeRouter.route('/add-code').post(addCode);
codeRouter.route('/update/:id').put(updateCode);
codeRouter.route('/delete/:id').delete(deleteCode);

export default codeRouter;