import express from "express";
import adminRoute from "./admin";
import bikerRoute from "./biker";

const route = express.Router();

route.use("/admin", adminRoute);
route.use("/biker", bikerRoute);

export default route;
