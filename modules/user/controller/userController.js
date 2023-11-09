const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../../config/db");
const fs = require("fs");
const path = require("path");
const yup = require("yup");
require("dotenv").config();

const userSchema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  address: yup.string(),
  phone: yup.string(),
  email: yup.string().email().required(),
  filename: yup.string(),
});

exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;
    const offset = (page - 1) * perPage;
    const query = `SELECT * FROM users LIMIT $1 OFFSET $2`;
    const { rows } = await db.query(query, [perPage, offset]);
    if (rows.length === 0) {
      return res.json({ message: "There are no users on this page" });
    }
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const query = "SELECT * FROM users WHERE id = $1";
    const { rows } = await db.query(query, [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.addUser = async (req, res) => {
  try {
    await userSchema.validate(req.body);
    const { name, username, password, address, phone, email, image_name } =
      req.body;
    const usernameExistQuery = "SELECT * FROM users WHERE username = $1";
    const emailExistQuery = "SELECT * FROM users WHERE email = $1";
    const { rows: existingUsername } = await db.query(usernameExistQuery, [
      username,
    ]);
    const { rows: existingEmail } = await db.query(emailExistQuery, [email]);

    if (existingUsername.length > 0) {
      return res.json("Username already exists");
    }
    if (existingEmail.length > 0) {
      return res.json("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUserQuery =
      "INSERT INTO users (name, username, password, address, phone, email, image_name) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    const added = await db.query(insertUserQuery, [
      name,
      username,
      hashedPassword,
      address,
      phone,
      email,
      req.file.filename,
    ]);

    res.status(200).json({ success: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    const hashedPassword = await bcrypt.hash(updates.password, 10);

    const updateQuery =
      "UPDATE users SET name = $1, password = $2, address = $3, phone = $4 WHERE id = $5"; 
      await db.query(updateQuery, [
      updates.name,
      hashedPassword,
      updates.address,
      updates.phone,
      userId,
    ]);

    res.status(200).json({ success: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteQuery = "DELETE FROM users WHERE id = $1";
    const { rowCount } = await db.query(deleteQuery, [userId]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userQuery = "SELECT * FROM users WHERE username = $1";
    const { rows: userRows } = await db.query(userQuery, [username]);

    if (userRows.length === 0) {
      return res.send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, userRows[0].password);

    if (!passwordMatch) {
      return res.send("Invalid login details");
    }

    const payload = {
      user: {
        username: userRows[0].username,
        password: userRows[0].password,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ message: "User logged in successfully!!!", token: token });
  } catch (error) {
    return res.status(400).send("Invalid details");
  }
};
