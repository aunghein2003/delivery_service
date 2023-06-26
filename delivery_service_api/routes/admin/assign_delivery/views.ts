import express from "express";
import { assignDelivery, getAllDeliveries } from "./controllers";

const route = express.Router();

route.get("/", getAllDeliveries);
route.post("/", assignDelivery);

export default route;
