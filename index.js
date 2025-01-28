import express from "express";
import db from "./src/db/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the running api6" });
});
// test the database connection

db.sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("Error syncing database:", err));
