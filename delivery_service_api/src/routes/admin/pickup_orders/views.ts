import express from "express";
import { getAllOrders } from "./controllers";

const route = express.Router();

route.get("/", getAllOrders);

export default route;
