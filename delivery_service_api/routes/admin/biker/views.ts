import express from "express";
import {
  createBiker,
  deleteBiker,
  getBikers,
  updateBiker,
} from "./controllers";

const route = express.Router();

route.route("/").get(getBikers).post(createBiker);
route.route("/:id").patch(updateBiker).delete(deleteBiker);

export default route;
