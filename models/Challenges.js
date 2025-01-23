import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Challenges = db.define('Challenges', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(400), 
        allowNull: false,
    }, 
    description: {
        type: DataTypes.STRING(400), 
        allowNull: false,
    }, 
    start_date: {
        type: DataTypes.DATE,
        allowNull: true,
    }, 
    end_date: {
        type: DataTypes.DATE,
        allowNull: true,
    }, 
    status: {
        type: DataTypes.ENUM('active', 'completed', 'cancelled'), 
        allowNull: false,
        defaultValue: 'active',
    }, 
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }, 
    user_id: {
        type: DataTypes.INTEGER, 
        allowNull: true,
    }, 
}, {
    // specify the name of the table that already exists in the database    
    tableName: 'challenges',
    timestamps: false,
});

export default Challenges;