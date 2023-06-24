import express from "express";
import authRoute from "./auth/views";
import bikersRoute from "./biker/views";
import { authorizeUser } from "./middlewares";

const route = express.Router();

route.use("/auth", authRoute);

route.use(authorizeUser);

route.use("/biker", bikersRoute);

export default route;
