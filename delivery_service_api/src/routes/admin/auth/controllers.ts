import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function authenticateAdmin(req: Request, res: Response) {
  const code = req.body?.code;
  const password = req.body?.password;
  const remember = req.body?.remember || false;

  if (!code || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Code and Password missing!" });
  }

  const dbAdmin = await prisma.admin.findUnique({
    where: { code },
  });

  if (!dbAdmin) {
    return res.status(400).json({ success: false, msg: "Code not found!" });
  }

  const { hashed_password } = dbAdmin;

  const valid = await bcrypt.compare(password, hashed_password);

  if (!valid) {
    return res.status(400).json({ success: false, msg: "Incorrect Password!" });
  }

  let token = jwt.sign(
    { code, hashed_password },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: remember ? 60 * 60 * 24 * 7 : 60 * 60 * 24 }
  );

  res.status(200).json({ success: true, accessToken: token });
}
