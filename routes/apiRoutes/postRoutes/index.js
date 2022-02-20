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

router.get('/:postId', getSinglePost)

router.patch('/:postId', editPost)

module.exports = router;