const db = require("../Config/configblogDb");

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM posts');
        res.status(200).send({
            success: true,
            message: "All blog posts retrieved successfully",
            data: rows,
        });
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).send({
            success: false,
            message: "Error retrieving posts",
            error,
        });
    }
};

// Get a single post by ID
const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "Post not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Post retrieved successfully",
            data: rows[0],
        });
    } catch (error) {
        console.error('Error retrieving post:', error);
        res.status(500).send({
            success: false,
            message: "Error retrieving post",
            error,
        });
    }
};

// Create a new post
const createPost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.session.userId;

    if (!title || !content) {
        return res.status(400).send({
            success: false,
            message: "Title and content are required",
        });
    }

    try {
        await db.query('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', [title, content, userId]);

        res.status(201).send({
            success: true,
            message: "Post created successfully",
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send({
            success: false,
            message: "Error creating post",
            error,
        });
    }
};

// Update an existing post
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.session.userId;

    try {
        const [result] = await db.query(
            'UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?',
            [title, content, id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "Post not found or you're not authorized to update this post",
            });
        }

        res.status(200).send({
            success: true,
            message: "Post updated successfully",
        });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).send({
            success: false,
            message: "Error updating post",
            error,
        });
    }
};

// Delete a post
const deletePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    try {
        const [result] = await db.query('DELETE FROM posts WHERE id = ? AND user_id = ?', [id, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "Post not found or you're not authorized to delete this post",
            });
        }

        res.status(200).send({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send({
            success: false,
            message: "Error deleting post",
            error,
        });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
