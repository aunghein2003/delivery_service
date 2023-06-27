import express from "express";
import { changePassword, updateProfile } from "./controllers";

const route = express.Router();

route.patch("/:id", updateProfile);
route.patch("/:id/change_pwd", changePassword);

export default route;
