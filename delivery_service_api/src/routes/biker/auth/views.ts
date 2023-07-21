import express from "express";
import { authenticateBiker } from "./controllers";

const route = express.Router();

route.post("/", authenticateBiker);

export default route;
