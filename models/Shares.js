import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Users from './User.js';
import Posts from './Posts.js';

const Shares = db.define('Shares', {
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
    created_at: {
        type: DataTypes.DATE, 
        allowNull: true,
    },
}, {
    // specify the name of the table that already exists in the database    
    tableName: 'shares',
    timestamps: false,
});

Shares.belongsTo(Users, { foreignKey: 'user_id' });
Shares.belongsTo(Posts, { foreignKey: 'post_id' });

export default Shares;