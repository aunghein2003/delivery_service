import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => console.log(`Server listens on Port 8080`));
