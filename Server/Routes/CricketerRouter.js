import express from "express";
import auth from "../Middlewares/Auth.js";
import getAllCricketer from "../Controllers/CricketerController/GetAllCricketers.Controller.js";
import addCricketer from "../Controllers/CricketerController/AddCricketer.Controller.js";
import updateCricketerByID from "../Controllers/CricketerController/UpdateCricketerByID.Controller.js";

const router = express.Router();

router.get("/get-cricketers", auth, getAllCricketer);
router.post("/add-cricketer", auth, addCricketer);
router.put("/update-cricketer/:id", auth, updateCricketerByID);

export default router;
