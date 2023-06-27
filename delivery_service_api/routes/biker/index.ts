import express from "express";
import authRoute from "./auth/views";
import profileRoute from "./profile/views";
import { authorizeBiker } from "./middlewares";

const route = express.Router();

route.use("/auth", authRoute);

route.use(authorizeBiker);

route.use("/profile", profileRoute);

export default route;
