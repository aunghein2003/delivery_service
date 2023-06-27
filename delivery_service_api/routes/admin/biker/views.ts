import express from "express";
import { createBiker, deleteBiker, getBikers } from "./controllers";

const route = express.Router();

route.route("/").get(getBikers).post(createBiker);
route.route("/:id").delete(deleteBiker);

export default route;
