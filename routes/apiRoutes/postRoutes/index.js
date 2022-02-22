const router = require('express').Router();
const {
    createPost,
    getAllPosts,
    getSinglePost,
    editPost,
    createPostView
} = require('../../../controllers/PostsController');

router.route('/')
    .get(getAllPosts)

router.route('/create')
    .get(createPostView)
    .post(createPost)

router.route('/:postId')
    .get(getSinglePost)

module.exports = router;