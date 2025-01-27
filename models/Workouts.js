import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Workouts = db.define('Workouts', {
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
        allowNull: false,
    }, 
    image: {
        type: DataTypes.STRING(400),
        allowNull: false,
    }, 
    duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }, 
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    // specify the name of the table that already exists in the database    
    tableName: 'workouts',
    timestamps: false,
});

export default Workouts;