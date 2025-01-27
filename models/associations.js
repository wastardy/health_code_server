import User from './User.js';
import Posts from './Posts.js';
import Comments from './Comments.js';
import Relationships from './Relationships.js';

// Define associations
User.hasMany(Posts, { foreignKey: 'user_id' });
Posts.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Relationships, { foreignKey: 'follower_id' });
Relationships.belongsTo(User, { foreignKey: 'follower_id' });

User.hasMany(Relationships, { foreignKey: 'following_id' });
Relationships.belongsTo(User, { foreignKey: 'following_id' });


User.hasMany(Comments, { foreignKey: 'user_id' });
Comments.belongsTo(User, { foreignKey: 'user_id' });

Posts.hasMany(Comments, { foreignKey: 'post_id' });
Comments.belongsTo(Posts, { foreignKey: 'post_id' });


// associations between WorkoutCategories and Workouts
WorkoutCategories.hasMany(Workouts, { foreignKey: 'category_id' });
Workouts.belongsTo(WorkoutCategories, { foreignKey: 'category_id' });

export { User, Posts, Relationships, Comments };