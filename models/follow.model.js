const moongose = require('mongoose');

const followSchema = new moongose.Schema({
    follower: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User'
    },
    following: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Follow = moongose.model('Follow', followSchema);

module.exports = Follow;