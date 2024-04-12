const Folow = require('../models/follow.model');
const User = require('../models/user.model');

const followUser = async (req, res) => {
    try {
        const userExist = await User.findById(req.params.id);
        if (!userExist) {
            return res.status(404).json({ message: 'User to follow not found' });
        }            
        const follow = await Folow.create({
            follower: req.body.follower,
            following: req.body.following
        });

        //update followers in user
        await userExist.updateOne({ $push: { followers: req.body.follower } });

        res.status(201).json(follow);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const unfollowUser = async (req, res) => {
    try {
        const userExist = await User.findById(req.params.id);
        if (!userExist) {
            return res.status(404).json({ message: 'User to unfollow not found' });
        }
        await Folow.findOneAndDelete({ follower: req.body.follower, following: req.body.following });

        //update followers in user
        await userExist.updateOne({ $pull: { followers: req.body.follower } });
        
        res.json({ message: 'Unfollowed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    followUser,
    unfollowUser
};
