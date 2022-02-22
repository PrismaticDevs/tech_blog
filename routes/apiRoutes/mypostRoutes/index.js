const router = require('express').Router();
const {
    createPost,
    editPost,
    createPostView,
    getMyPosts,
    getSingleMyPost,
    deletePost,
    editPostView,
} = require('../../../controllers/PostsController');

router.route('/')
    .get(getMyPosts)

router.route('/create')
    .get(createPostView)
    .post(createPost)

router.route('/:postId')
    .get(getSingleMyPost)
    .delete(deletePost);

router.route('/:postId/edit')
    .put(editPost)
    .get(editPostView)

module.exports = router;