import express from "express";
import { authenticateAdmin } from "./controllers";

const route = express.Router();

route.post("/", authenticateAdmin);

export default route;
