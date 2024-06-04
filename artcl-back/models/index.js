// Import Models
const User = require("../models/user");
const Article = require("../models/article");
const Comment = require("../models/comment");
const Role = require("../models/role");

// Relations
  User.hasMany(Article, {
    foreignKey: "author_id",
    onDelete: "CASCADE",
  });
  Article.belongsTo(User, { as: "author", foreignKey: "author_id" });
  
  User.hasMany(Comment, {
    foreignKey: "author_id",
    onDelete: "CASCADE",
  });
  Comment.belongsTo(User, { as: "author", foreignKey: "author_id" });
  
  Article.hasMany(Comment, {
    as: "comment",
    foreignKey: "article_id",
    onDelete: "CASCADE",
  });
  Comment.belongsTo(Article, { as: "article", foreignKey: "article_id" });
  
  Role.hasMany(User, {
    foreignKey: "role_id",
    onDelete: "CASCADE",
  });
  User.belongsTo(Role, { as: "role", foreignKey: "role_id" });
  
  const models = {
    User: User,
    Article: Article,
    Role: Role,
    Comment: Comment
  }

  module.exports = models