import express from "express";
import {
  loginController,
  testController,
  forgotPasswordController,
  registercontroller,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controller/authcontroller.js";

import { isAdmin, requireSignIN } from "../middlewares/authmiddleware.js";
const router = express.Router();
// routing
// register

router.post("/register", registercontroller);

//login // method post
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test route
router.get("/test", requireSignIN, isAdmin, testController);
// protected route auth

router.get("/user-auth", requireSignIN, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignIN, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIN, updateProfileController);

//orders
router.get("/orders", requireSignIN, getOrdersController);

//all orders
router.get("/all-orders", requireSignIN, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIN,
  isAdmin,
  orderStatusController
);
export default router;
