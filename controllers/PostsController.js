const {
    Post
} = require('../models');

module.exports = {
    createPost: async(req, res) => {
        const { title, body } = req.body;
        if (!title || !body) {
            return res.status(400).json({ error: "You must provide a title and the post-body." });
        }
        try {
            const post = await Post.create({
                title,
                body,
            });
        } catch (error) {
            res.json(error);
        }
    },
    getAllPosts: async(req, res) => {
        try {
            const postData = await Post.findAll({});
            const posts = postData.map(post => post.get({ plain: true }));
            res.render('allPosts', {
                posts,
            });
        } catch (error) {
            res.json(e);
        }
    }
};