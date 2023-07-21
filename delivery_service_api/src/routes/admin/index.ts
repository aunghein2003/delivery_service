import express from "express";
import authRoute from "./auth/views";
import bikersRoute from "./biker/views";
import onlineShopRoute from "./online_shop/views";
import pickupOrdersRoute from "./pickup_orders/views";
import assignDeliveryRoute from "./assign_delivery/views";
import { authorizeAdmin } from "./middlewares";

const route = express.Router();

route.use("/auth", authRoute);

route.use(authorizeAdmin);

route.use("/biker", bikersRoute);
route.use("/online_shop", onlineShopRoute);
route.use("/pickup_orders", pickupOrdersRoute);
route.use("/assign_delivery", assignDeliveryRoute);

export default route;
