import express from "express";
import {helpControl} from "../contorllers/helpControl.controller.js"
const router = express.Router();

router.post("/send", helpControl);

export default router;