const Like = require('../models/like.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');

const likePost = async (req, res) => {
    try {
        //Check if the post exists
        const post = await Post.findById(req.body.post);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user exists
        const user = await User.findById(req.body.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has already liked the post
        const existingLike = await Like.findOne({
            user: req.body.user,
            post: req.body.post
        });
        if (existingLike) {
            return res.status(400).json({ message: 'User have already liked this post' });
        }

        //Create the like
        const like = await Like.create({
            user: req.body.user,
            post: req.body.post
        });

        //Update the post
        await post.updateOne({ $push: { likes: user._id } });

        res.status(201).json(like);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const unlikePost = async (req, res) => {
    try {
        //Check if the post exists
        const post = await Post.findById(req.body.post);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user exists
        const user = await User.findById(req.body.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await Like.findOneAndDelete({
            user: req.body.user,
            post: req.params.id,
        });

        //Update the post
        await post.updateOne({ $pull: { likes: user._id } });
        res.json({ message: 'Unliked successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    likePost,
    unlikePost
};