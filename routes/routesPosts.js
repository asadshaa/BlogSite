const express = require('express');
const router = express.Router();
const {getAllPosts,getPostById,createPost,updatePost,deletePost}=require("../controller/PostsController");


// const isAuthenticated = (req, res, next) => {
//     if (req.session.userId) {
//         return next();
//     }
//     res.redirect('/');
// };

router.get('/posts', getAllPosts);                // Get all posts
router.get('/posts/:id', getPostById);            // Get a single post by ID
router.post('/posts', /*isAuthenticated*/ createPost); // Create a new post
router.put('/posts/:id', /*isAuthenticated*/updatePost); // Update a post by ID
router.delete('/posts/:id',  deletePost); // Delete a post by ID

module.exports = router;

