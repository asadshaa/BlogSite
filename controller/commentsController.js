const db = require("../Config/configblogDb");

// Get all comments for a post
const getCommentsByPostId = async (req, res) => {
    const { postId } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM comments_real WHERE post_id = ?', [postId]);
        res.status(200).send({
            success: true,
            message: "Comments retrieved successfully",
            data: rows,
        });
    } catch (error) {
        console.error('Error retrieving comments:', error);
        res.status(500).send({
            success: false,
            message: "Error retrieving comments",
            error,
        });
    }
};

const addComment = async (req, res) => {
    const { postId } = req.params;
    const { comment_text } = req.body;
    const userId = req.session.userId;

    if (!comment_text) {
        return res.status(400).send({
            success: false,
            message: "Content is required",
        });
    }

    try {
        await db.query('INSERT INTO comments_real (post_id, user_id, comment_text) VALUES (?, ?, ?)', [postId, userId, comment_text]);
        res.status(201).send({
            success: true,
            message: "Comment added successfully",
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send({
            success: false,
            message: "Error adding comment",
            error,
        });
    }
};

module.exports = {
    getCommentsByPostId,
    addComment,
};
