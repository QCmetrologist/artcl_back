const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const commentController = require('../controllers/commentController');

router.post('/:articleId', authJwt.verifyToken, commentController.createComment);
router.delete('/:articleId',authJwt.verifyToken, commentController.deleteComment);
router.put('/:articleId',authJwt.verifyToken, commentController.updateComment);

module.exports = router