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
            const postData = await Post.findAll({
                where: {
                    userId: "5fa45500-5c4a-478f-9e22-4350ef5f2f09"
                }
            });
            console.log(postData, 24);
            const posts = postData.map(post => post.get({ plain: true }));
            console.log(posts);
            res.render('allPosts', {
                posts,
            });
        } catch (error) {
            console.log(error, 'err', 30);
            res.json(error);
        }
    }
};