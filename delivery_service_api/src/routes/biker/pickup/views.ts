import express from "express";
import { createPickup, getPickups } from "./controllers";

const route = express.Router();

route.get("/", getPickups);
route.post("/", createPickup);

export default route;
