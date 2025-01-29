import express from "express";
import userController from "../controllers/userController.js";
import validateSchema from "../middleware/validateSchema.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/", validateSchema(userSchema), userController.createUser);
userRouter.put("/:id", validateSchema(userSchema), userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
