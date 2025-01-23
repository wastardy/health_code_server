import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Likes = db.define('Likes', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    }, 
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
}, {
    // specify the name of the table that already exists in the database    
    tableName: 'likes',
    timestamps: false,
});

export default Likes;