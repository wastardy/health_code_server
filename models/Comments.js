import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Comments = db.define('Comments', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING(400), 
        allowNull: false,
    }, 
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
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
    tableName: 'comments',
    timestamps: false,
});

export default Comments;