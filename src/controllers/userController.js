import db from "../db/db.js";

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await db.User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await db.User.findByPk(id);
      if (user) {
        const { password: _, ...userWithoutPassword } = user.toJSON();
        res.status(201).json(userWithoutPassword);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const newUser = await db.User.create({ name, email, password });
      const { password: _, ...userWithoutPassword } = newUser.toJSON();
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
      const user = await db.User.findByPk(id);
      if (user) {
        user.name = name;
        user.email = email;
        user.password = password;
        await user.save();
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await db.User.findByPk(id);
      if (user) {
        await user.destroy();
        res.json({ message: "User deleted" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default userController;
