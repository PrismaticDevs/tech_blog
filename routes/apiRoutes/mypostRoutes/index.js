const router = require('express').Router();
const {
    createPost,
    getAllPosts,
    getSinglePost,
    editPost,
    createPostView,
    getMyPosts,
    getSingleMyPost,
    deletePost,
} = require('../../../controllers/PostsController');

router.route('/')
    .get(getMyPosts)

router.route('/create')
    .get(createPostView)
    .post(createPost)

router.get('/:postId', getSingleMyPost);

router.patch('/:postId', editPost);

router.delete('/:postId', deletePost);

module.exports = router;