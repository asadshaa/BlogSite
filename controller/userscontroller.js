const db = require('../Config/configblogDb');

const getusers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM usersTable');
        if (rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No records found",
            });
        }
        res.status(200).send({
            success: true,
            message: "All user records",
            data: rows,
        });
    } catch (error) {
        console.log('Error in getusers', error);
        res.status(500).send({
            success: false,
            message: "Error in getting users",
            error,
        });
    }
};

const addNewUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({
            success: false,
            message: "Name, email, and password are required",
        });
    }

    try {
        await db.query('INSERT INTO userstable (Username, Email, Password) VALUES (?, ?, ?)', [name, email, password]);
        res.status(201).send({
            success: true,
            message: "User created",
        });
    } catch (error) {
        console.log("Error in create user", error);
        res.status(500).send({
            success: false,
            message: "Error creating user",
            error,
        });
    }
};

const updateUser = async (req, res) => {
    const { Id, name, email, password } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE userstable SET Username = ?, Email = ?, Password = ? WHERE Id = ?',
            [name, email, password, Id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "User updated successfully",
        });
    } catch (error) {
        console.log("Error in updateUser", error);
        res.status(500).send({
            success: false,
            message: "Error updating user",
            error,
        });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM userstable WHERE Id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.log("Error in deleteUser", error);
        res.status(500).send({
            success: false,
            message: "Error deleting user",
            error,
        });
    }
};

module.exports = {
    getusers, addNewUser, updateUser, deleteUser,
};
