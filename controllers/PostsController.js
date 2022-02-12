const {
    Post,
    User
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
                userId: req.session.user.id
            });
            res.render('allPosts');
        } catch (error) {
            res.json(error);
        }
    },
    getAllPosts: async(req, res) => {
        try {
            if (!req.session.user) {
                res.redirect('/');
            }
            const postData = await Post.findAll({
                where: {
                    userId: req.session.user.id
                },
                include: [{
                    model: User,
                }],
                order: [
                    ['createdAt', 'DESC']
                ],
            });
            const posts = postData.map(post => post.get({ plain: true }));
            res.render('allPosts', {
                posts,
            });
        } catch (error) {
            console.log(error, 'err', 30);
            res.json(error);
        }
    },
    getSinglePost: async(req, res) => {
        try {
            if (!req.session.user) {
                res.redirect('/');
            }
            const postData = await Post.findByPk(req.params.postId, {
                include: [{
                    model: User,
                }],
            });
            const post = postData.get({ plain: true });
            res.render('singlePost', {
                post,
            });
        } catch (error) {
            res.json(error);
        }
    },
    editPost: async(req, res) => {
        try {
            if (!req.session.user) {
                res.redirect('/');
            }
            const updatePost = Post.update({
                title: req.body.title,
                body: req.body.title,
            }, {
                where: {
                    postId: req.params.id
                }
            });
            res.render('allPosts');
        } catch (error) {
            res.json(error);
        }
    }
};