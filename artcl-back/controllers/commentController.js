const Article = require("../models/article");
const User = require("../models/user");
const Comment = require("../models/comment");
const asyncHandler = require('express-async-handler');


exports.createComment = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const articleId = req.params.articleId;
  const author = await User.findByPk(userId);
  const article = await Article.findByPk(articleId);
  if(!article) {return res.status(404).send({ message: "Comment Not found." })}
  const { body } = req.body;
  
  if (!body) {
    res.status(400).json({message: "Body is required"});
  }

  const comment = await Comment.create({ body });
  comment.setAuthor(author);
  comment.setArticle(article);
  res.status(201).json({ comment });
}); 

exports.deleteComment = asyncHandler(async (req, res) => {
  const articleId = req.params.articleId;
  const userId = req.userId;
 
  try { 
  const comment = await Comment.findOne({
    where: { article_id: articleId }
  });
  if (!comment) return res.status(404).json({ message: 'Comment not found' });

  if (comment.author_id !== userId)
    return res.status(401).json({ message: 'Unauthorized' });

  await comment.destroy();

  res.status(200).json({ message: 'Comment deleted' }) 
} 
catch (error) { 
    console.error(error); 
    res.status(500).json({ message: 'An error occurred while deleting comment' }) 
} 
});


exports.updateComment = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const articleId = req.params.articleId;
  const { body } = req.body;

  try {
    const comment = await Comment.findOne({
      where: { article_id: articleId }
    });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.author_id !== userId)
      return res.status(401).json({ message: 'Unauthorized' });

    if (body) {
      comment.body = body || comment.body;

    await comment.save();
    res.status(200).json({ message: 'Comment updated', comment });
  } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the comment' });
  }
});