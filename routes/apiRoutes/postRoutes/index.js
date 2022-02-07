const router = require('express').Router();
const {
    createPost,
    getAllPosts,
} = require('../../../controllers/PostsController');

router.route('/')
    .get(getAllPosts)
    .post(createPost)

module.exports = router;