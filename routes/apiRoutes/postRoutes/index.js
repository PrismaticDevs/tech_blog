const router = require('express').Router();
const {
    createPost,
    getAllPosts,
    getSinglePost,
    editPost
} = require('../../../controllers/PostsController');

router.route('/')
    .get(getAllPosts)
    .post(createPost)

router.route('/:postId')
    .get(getSinglePost)

router.patch('/posts/:postId', editPost)

module.exports = router;