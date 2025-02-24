import express from "express";
import auth from "../Middlewares/Auth.js";
import isAuthenticated from "../Controllers/UserControllers/IsAuthenticated.Controller.js";
import getUserData from "../Controllers/UserControllers/GetUserData.Controller.js";
const router = express.Router();

router.get("/is-authenticated", auth, isAuthenticated);
router.get("/get-user-data", auth, getUserData);
export default router;
