const bcrypt = require("bcryptjs");

const {
    User
} = require('../models');

module.exports = {
    createUser: async(req, res) => {
        let { username, email, password } = req.body;
        try {
            const user = await User.create({
                username,
                email,
                password,
            });

            req.session.save(() => {
                req.session.loggedIn = true;
                req.session.user = user;
                req.session.userId = user.id;
                return res.redirect('/posts');
            });
        } catch (error) {
            return res.json(error);
        }
    },
    getAllUsers: async(req, res) => {
        try {
            const usersData = await User.findAll({});
            const users = usersData.map(user => user.get({ plain: true }));
            return res.render('allUsers', {
                users,
            });
        } catch (error) {
            return res.json(e);
        }
    },
    getUserById: async(req, res) => {
        try {
            req.session.save(() => {
                if (req.session.visitCount) {
                    req.session.visitCount++;
                } else {
                    req.session.visitCount = 1;
                }
            });
            const userData = await User.findByPk(req.params.userId);
            const user = userData.get({ plain: true });
            return res.render('singleUser', {
                user,
                visitCount: req.session.visitCount,
            });
        } catch (e) {
            return res.json(e);
        }
    },
    login: async(req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json("You must provide a valid email and password");
        }

        try {
            const userData = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!userData) {
                return res.json("No user with that email");
            }
            const userFound = userData.get({ plain: true });
            if (!userFound) {
                return res.json("No user with that email");
            }
            const isMatchingPassword = await bcrypt.compare(
                password,
                userFound.password
            );
            if (!isMatchingPassword) {
                return res.json("Invalid password");
            }
            req.session.save(() => {
                req.session.loggedIn = true;
                req.session.user = userFound;
                req.session.user_id = userFound.id;
                return res.json(req.session.user.username + " successfully logged in");
            });
        } catch (error) {
            return res.json(error);
        }
    },
    signupHandler: async(req, res) => {
        const { email, username, password } = req.body;
        try {
            const user = await User.create({
                email,
                username,
                password,
            });
            req.session.save(() => {
                req.session.loggedIn = true;
                req.session.user = createdUser;
                req.session.userId = createdUser.id;
                return res.status(200);
            });
        } catch (e) {
            console.log(e);
            return res.json(e);
        }
    },
    loginView: (req, res) => {
        if (req.session.loggedIn) {
            return res.redirect('/todos');
        }
        res.render('login');
    },
    signupView: (req, res) => {
        if (req.session.loggedIn) {
            return res.redirect('/todos');
        }
        res.render('signUp');
    },
    logout: (req, res) => {
        req.session.destroy(() => {
            return res.redirect('/');
        });
    },
};