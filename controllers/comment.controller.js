const Comment = require('../models/comment.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');

const addComment = async (req, res) => {
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

        //Create the comment
        const comment = await Comment.create({
            user: req.body.user,
            post: req.body.post,
            content: req.body.content
        });

        //Update the post
        await post.updateOne({ $push: { comments: comment._id } });

        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addComment
};

