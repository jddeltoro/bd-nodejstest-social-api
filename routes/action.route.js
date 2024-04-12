const express = require('express');
const router = express.Router();
const followController = require('../controllers/follow.controller');
const likeController = require('../controllers/like.controller');

router.post('/follow/:id', followController.followUser);
router.post('/unfollow/:id', followController.unfollowUser);

router.post('/like/:id', likeController.likePost);
router.post('/unlike/:id', likeController.unlikePost);

module.exports = router;