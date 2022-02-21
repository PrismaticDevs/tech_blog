const router = require('express').Router();
const {
    createPost,
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

router.route('/:postId')
    .get(getSingleMyPost)
    .patch(editPost)
    .delete(deletePost);

module.exports = router;