const express = require('express');
const router = express.Router();
const commentsController = require('../controller/commentsController'); 

router.get('/posts/:postId/comments', commentsController.getCommentsByPostId);


router.post('/posts/:postId/comments', commentsController.addComment);

module.exports = router;
