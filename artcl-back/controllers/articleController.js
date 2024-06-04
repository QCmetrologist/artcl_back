const Article = require("../models/article");
const User = require("../models/user");
const Comment = require("../models/comment");
const asyncHandler = require('express-async-handler');
const slugify = require("slugify");
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 9898,
  dialect: 'postgres'
});



exports.createArticle = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const author = await User.findByPk(userId);
  const { title, description, body } = req.body;

  try {
    if (!title || !description || !body) {
      res.status(400).json({ message: "All fields are required" });
    }

    const slug = slugify(title, { lower: true });

    const slugInDB = await Article.findOne({ where: { slug: slug } });

    if (slugInDB) {
      return res.status(400).json({ message: "Title already exists" });
    }

    const article = await Article.create({ slug, title, description, body });
    await article.setAuthor(author);
    res.status(201).json({ article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating an article' });
  }
});

exports.getAllArticles = asyncHandler(async (req, res) => {
  const viewOptions = {
    attributes: {exclude: ["author_id"] },
    include: [
      { model: User, as: "author", attributes: {exclude: ["email", "password", "role_id"] } },
      {
        model: Comment,
        as: "comment",
        attributes: ["body"],
        include: [
          {
            model: User,
            as: "author",
            attributes: ['id', 'username']
          }
        ],
        order: [["createdAt", "DESC"]]
      }
    ],
    order: [["createdAt", "DESC"]]
  };

  const articles = await Article.findAll(viewOptions);

  res
    .status(200)
    .json({ articles });
});

exports.getArticle = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
   const viewOptions = {
    where: { slug: slug },
    attributes: {exclude: ["author_id"] },
    include: [
      { model: User, as: "author", attributes: {exclude: ["email", "password", "role_id"] }},
      {
        model: Comment,
        as: "comment",
        attributes: ["body"],
        include: [
          {
            model: User,
            as: "author",
            attributes: ['id', 'username']
          }
        ],
        order: [["createdAt", "DESC"]]
      }
    ]
  };

  const article = await Article.findOne(viewOptions);

  if (!article) return next(new ErrorResponse("Article not found", 404));
  res.status(200).json({ article });
});



exports.deleteArticle = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const userId = req.userId;
 
  try { 
  const article = await Article.findOne({
    where: { slug: slug }
  });
  if (!article) return res.status(404).json({ message: 'Article not found' });

  if (article.author_id !== userId)
    return res.status(401).json({ message: 'Unauthorized' });

  await article.destroy();

  res.status(200).json({ message: 'Article deleted' }) 
} 
catch (error) { 
    console.error(error); 
    res.status(500).json({ message: 'An error occurred while deleting article' }) 
} 
});


exports.updateArticle = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { slug } = req.params;
  const { title, description, body } = req.body;

  try {
    const article = await Article.findOne({ where: { slug: slug } });
    if (!article) return res.status(404).json({ message: 'Article not found' });

    if (article.author_id !== userId)    
      return res.status(401).json({ message: 'Unauthorized' });

    if (title) {
      const newSlug = slugify(title, { lower: true });
      const slugInDB = await Article.findOne({ where: { slug: newSlug } });
      if (slugInDB && slugInDB.id !== article.id) {
        return res.status(400).json({ message: 'Title already exists' });
      }
      article.slug = newSlug;
    }

    article.title = title || article.title;
    article.description = description || article.description;
    article.body = body || article.body;

    await article.save();
    res.status(200).json({ message: 'Article updated', article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the article' });
  }
});