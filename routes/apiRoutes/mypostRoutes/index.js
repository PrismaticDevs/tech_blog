const router = require('express').Router();
const {
    createPost,
    getAllPosts,
    getSinglePost,
    editPost,
    createPostView,
    getMyPosts,
    getSingleMyPost,
} = require('../../../controllers/PostsController');

router.route('/')
    .get(getMyPosts)

router.route('/create')
    .get(createPostView)
    .post(createPost)

router.get('/:postId', getSingleMyPost)

router.patch('/:postId', editPost)

module.exports = router;