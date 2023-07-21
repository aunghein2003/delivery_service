import express from "express";
import {
  createOnlineShop,
  getOnlineShops,
  updateOnlineShop,
} from "./controllers";

const route = express.Router();

route.route("/").get(getOnlineShops).post(createOnlineShop);
route.route("/:id").patch(updateOnlineShop);

export default route;
