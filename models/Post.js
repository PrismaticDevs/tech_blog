const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config');

class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: 'posts',
});

module.exports = Post;