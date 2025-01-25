import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Posts = db.define('Posts', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    },
    post_title: {
        type: DataTypes.STRING(200),
        allowNull: true,
    }, 
    post_description: {
        type: DataTypes.STRING(400),
        allowNull: true,
    }, 
    image: {
        type: DataTypes.STRING(400),
        allowNull: true,
    }, 
    video: {
        type: DataTypes.STRING(400),
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE, 
        allowNull: true,
    },
}, {
    // specify the name of the table that already exists in the database    
    tableName: 'posts',
    timestamps: false,
});

export default Posts;