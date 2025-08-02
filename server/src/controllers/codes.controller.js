import {Code} from '../models/codes.model.js';

const addCode = async(req,res)=>{
    try {
        const snippet = new Code(req.body);
        await snippet.save();
        res
        .status(200)
        .json(snippet)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const updateCode = async(req,res)=>{
    try {
        const updated = await Code.findByIdAndUpdate(req.params.id,req.body, {new:true});
        res
        .status(200)
        .json(updated)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const deleteCode = async(req,res)=>{
    try {
        await Code.findByIdAndDelete(req.params.id);
        res
        .status(200)
        .json({
            message: "Code snippet deleted successfully"
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getAllCodes = async(req,res)=>{
    try {
        const codes = await Code.find();
        res
        .status(200)
        .json(codes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export {
    addCode,
    updateCode,
    deleteCode,
    getAllCodes
}