const Blog = require("./blog");
const User = require("./user");
const ReadingLists = require("./readingList");
const Login = require('./login')

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasOne(Login)
Login.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingLists })

module.exports = { Blog, User, ReadingLists, Login };
