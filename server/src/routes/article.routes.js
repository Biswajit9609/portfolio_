import { Router } from "express";
import {
    addArticle,
    updateArticle,
    deleteArticle,
    getAllArticles
} from "../controllers/articles.controller.js"

const articleRouter = Router();

articleRouter.route('/').get(getAllArticles);
articleRouter.route('/add-article').post(addArticle);
articleRouter.route('/update/:id').put(updateArticle);
articleRouter.route('/delete/:id').delete(deleteArticle);

export default articleRouter;