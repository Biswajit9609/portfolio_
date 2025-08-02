import express from "express"
import cors from "cors"
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static('public'))



import articleRouter from "./routes/article.routes.js"
import projectRouter from "./routes/project.routes.js"
import codeRouter from "./routes/code.routes.js"
// Using routes
app.use('/api/articles', articleRouter);
app.use('/api/projects', projectRouter);
app.use('/api/codes', codeRouter);
export {app}