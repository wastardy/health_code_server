import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Diets = db.define('Diets', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(150), 
        allowNull: false,
    }, 
    description: {
        type: DataTypes.STRING(500), 
        allowNull: false,
    }, 
    image: {
        type: DataTypes.STRING(400),
        allowNull: false,
    }, 
}, {
    // specify the name of the table that already exists in the database    
    tableName: 'diets',
    timestamps: false,
});

export default Diets;