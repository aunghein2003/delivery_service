import express from "express";
import { changePassword, updateProfile } from "./controllers";

const route = express.Router();

route.patch("/", updateProfile);
route.patch("/change_pwd", changePassword);

export default route;
