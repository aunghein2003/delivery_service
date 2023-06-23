import express from "express";
import authRoute from "./auth/views";
import { authorizeUser } from "./middlewares";

const route = express.Router();

route.use("/auth", authRoute);

route.use(authorizeUser);

export default route;
