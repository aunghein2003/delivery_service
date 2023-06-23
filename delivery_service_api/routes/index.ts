import express from "express";
import adminRoute from "./admin";

const route = express.Router();

route.use("/admin", adminRoute);

export default route;
