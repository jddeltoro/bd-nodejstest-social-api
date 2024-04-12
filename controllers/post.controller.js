const Post = require('../models/post.model');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user').populate('likes').populate('comments');
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const createPost = async (req, res) => {
    try {
        const post = await Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};