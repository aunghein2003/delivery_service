import express from "express";
import { getOnlineShops } from "./controllers";

const route = express.Router();

route.get("/", getOnlineShops);

export default route;
