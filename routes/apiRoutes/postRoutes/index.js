const router = require('express').Router();
const {
    createPost,
    getAllPosts,
} = require('../../../controllers/PostsController');

router.route('/posts')
    .get(getAllPosts)
    .post(createPost)

module.exports = router;