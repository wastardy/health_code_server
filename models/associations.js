import User from './User.js';
import Posts from './Posts.js';
import Relationships from './Relationships.js';

// Define associations
User.hasMany(Posts, { foreignKey: 'user_id' });
Posts.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Relationships, { foreignKey: 'follower_id' });
Relationships.belongsTo(User, { foreignKey: 'follower_id' });

User.hasMany(Relationships, { foreignKey: 'following_id' });
Relationships.belongsTo(User, { foreignKey: 'following_id' });

export { User, Posts, Relationships };