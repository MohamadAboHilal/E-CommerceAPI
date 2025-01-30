import express from "express";
import db from "./src/db/db.js";
import dotenv from "dotenv";
import userRouter from "./src/routes/userRoutes.js";
import categoryRouter from "./src/routes/categoryRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the running api6" });
});

// Other Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);

db.sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("Error syncing database:", err));
