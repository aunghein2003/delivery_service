import express from "express";

import authRoute from "./auth/views";
import profileRoute from "./profile/views";
import onlineShopRoute from "./online_shop/views";
import pickupRoute from "./pickup/views";

import { authorizeBiker } from "./middlewares";

const route = express.Router();

route.use("/auth", authRoute);

route.use(authorizeBiker);

route.use("/profile", profileRoute);
route.use("/online_shop", onlineShopRoute);
route.use("/pickup", pickupRoute);

export default route;
