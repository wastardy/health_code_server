import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const WorkoutCategories = db.define('WorkoutCategories', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(150), 
        allowNull: false,
    }, 
    description: {
        type: DataTypes.STRING(300), 
        allowNull: true,
    }, 
    image: {
        type: DataTypes.STRING(400),
        allowNull: false,
    }, 
    duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }, 
    difficulty: {
        type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'), 
        allowNull: false,
    },
}, {
    // specify the name of the table that already exists in the database    
    tableName: 'workout_categories',
    timestamps: false,
});

export default WorkoutCategories;