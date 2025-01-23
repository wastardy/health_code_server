import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Relationships = db.define('Relationships', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    },
    follower_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    }, 
    following_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    created_at: {
        type: DataTypes.DATE, 
        allowNull: true,
    },
}, {
    // specify the name of the table that already exists in the database    
    tableName: 'relationships',
    timestamps: false,
});

export default Relationships;