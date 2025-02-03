import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import validateSchema from "../middleware/validateSchema.js";
import { orderSchema } from "../schemas/orderSchema.js";

const router = express.Router();

router.post("/", validateSchema(orderSchema), createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", validateSchema(orderSchema), updateOrder);
router.delete("/:id", deleteOrder);

export default router;
