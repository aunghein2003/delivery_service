import express from "express";
import authRoute from "./auth/views";
import { authorizeBiker } from "./middlewares";

const route = express.Router();

route.use("/auth", authRoute);

route.use(authorizeBiker);

export default route;
