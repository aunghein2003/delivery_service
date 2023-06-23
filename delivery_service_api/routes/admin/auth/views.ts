import express from "express";
import { authenticateUser } from "./controllers";

const route = express.Router();

route.post("/", authenticateUser);

export default route;
