import { Article } from '../models/article.model.js'
const addArticle = async(req,res)=>{
    try {
        const { title, content, excerpt,featured } = req.body;
        const data = [title,content,excerpt,featured];
        if (data.includes(undefined) || data.includes(null)) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const article = await Article.create({
            title,
            excerpt,
            content,
            featured: featured || false
        })
        res.status(201).json({
            message:"Article created successfully",
            article: article
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const updateArticle = async(req,res)=>{
    try {
        const updated = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res
        .status(200)
        .json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const deleteArticle = async(req,res)=>{
    try {
        await Article.findByIdAndDelete(req.params.id);
        res
        .status(200)
        .json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getAllArticles = async(req,res)=>{
    try {
        const articles = await Article.find().sort({ createdAt: -1 });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export {
    addArticle,
    updateArticle,
    deleteArticle,
    getAllArticles
}