const {
    Post,
    User,
    Comment
} = require('../models');

module.exports = {
    createPost: async(req, res) => {
        if (!req.session.user) {
            return res.redirect("/");
        }
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
            return res.render('allPosts');
        } catch (error) {
            return res.json(error);
        }
    },
    getMyPosts: async(req, res) => {
        try {
            if (!req.session.user) {
                return res.redirect('/');
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
            return res.render('myPosts', {
                posts,
                loggedInUser: req.session.user || null,
                edit: true
            });
        } catch (error) {
            console.log(error, 'err', 30);
            return res.json(error);
        }
    },
    getAllPosts: async(req, res) => {
        try {
            if (!req.session.user) {
                return res.redirect('/');
            }
            const postData = await Post.findAll({
                include: [{
                    model: User,
                }],
                order: [
                    ['createdAt', 'DESC']
                ],
            });
            const posts = postData.map(post => post.get({ plain: true }));
            return res.render('allPosts', {
                posts,
                loggedInUser: req.session.user || null,
            });
        } catch (error) {
            console.log(error, 'err', 30);
            return res.json(error);
        }
    },
    getSingleMyPost: async(req, res) => {
        if (!req.session.user) {
            return res.redirect('/');
        }
        try {
            const postData = await Post.findByPk(req.params.postId, {
                include: [{
                    model: User,
                }],
            });
            const post = postData.get({ plain: true });
            const commentsData = await Comment.findAll({
                where: {
                    postId: req.params.postId,
                },
                include: [{
                    model: User,
                }],
                order: [
                    ["createdAt", "DESC"]
                ],
            });
            const comments = commentsData.map((comment) => comment.get({ plain: true }));
            return res.render('singlePost', {
                post,
                comments,
                loggedInUser: req.session.user || null,
                edit: true
            });
        } catch (error) {
            res.json(error);
        }
    },
    getSinglePost: async(req, res) => {
        if (!req.session.user) {
            return res.redirect('/');
        }
        try {
            const postData = await Post.findByPk(req.params.postId, {
                include: [{
                    model: User,
                }],
            });
            const post = postData.get({ plain: true });
            const commentsData = await Comment.findAll({
                where: {
                    postId: req.params.postId,
                },
                include: [{
                    model: User,
                }],
                order: [
                    ["createdAt", "DESC"]
                ],
            });
            const comments = commentsData.map((comment) => comment.get({ plain: true }));
            return res.render('singlePost', {
                post,
                comments,
                loggedInUser: req.session.user || null,
                edit: false
            });
        } catch (error) {
            res.json(error);
        }
    },
    editPost: async(req, res) => {
        try {
            if (!req.session.user) {
                return res.redirect('/');
            }
            const updatePost = Post.update({
                title: req.body.title,
                body: req.body.title,
            }, {
                where: {
                    postId: req.params.id
                }
            });
            return res.render('allPosts');
        } catch (error) {
            return res.json(error);
        }
    },
    createPostView: async(req, res) => {
        if (!req.session.user) {
            return res.redirect('/');
        }
        return res.render('createPost', {
            loggedInUser: req.session.user || null,
        });
    },
    deletePost: async(req, res) => {
        if (!req.session.user) {
            return res.redirect('/');
        }
        const deletePost = await Post.destroy({
            where: {
                postId: req.params.id,
            }
        });
        res.redirect('/myposts');
    }
};