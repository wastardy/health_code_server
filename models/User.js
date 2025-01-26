import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    cover_image: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    profile_image: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, 
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }, 
    height: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }, 
}, {
    // specify the name of the table that already exists in the database    
    tableName: 'users',
    timestamps: false,
});

export default User;