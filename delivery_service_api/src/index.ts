import express from "express";
import dotenv from "dotenv";
import route from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/", route);

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ success: false, msg: "Path not found or Method Incorrect" });
});

app.listen(process.env.PORT, () => console.log(`Server listens on Port 8080`));

export default app;
