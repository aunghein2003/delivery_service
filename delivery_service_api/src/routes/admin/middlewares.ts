import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function authorizeAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, msg: "Token missing!" });
  }

  try {
    const decode: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    const code = decode?.code;
    const hashed_password = decode?.hashed_password;

    if (!code || !hashed_password) {
      return res.status(403).json({ success: false, msg: "re-auth" });
    }

    const dbAdmin = await prisma.admin.findUnique({ where: { code } });

    if (!dbAdmin) {
      return res.status(403).json({ success: false, msg: "re-auth" });
    }

    const { hashed_password: hash_pwd_db } = dbAdmin;

    if (hashed_password !== hash_pwd_db) {
      return res.status(403).json({ success: false, msg: "re-auth" });
    }
    next();
  } catch (err) {
    return res.status(403).json({ success: false, msg: "re-auth" });
  }
}
