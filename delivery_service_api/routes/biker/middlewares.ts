import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function authorizeBiker(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, msg: "Token missing" });
  }

  try {
    const decode: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    if (!decode?.code || !decode?.hashed_password) {
      return res.status(403).json({ success: false, msg: "re-auth" });
    }

    const dbBiker = await prisma.biker.findUnique({
      where: { code: decode.code },
    });

    if (!dbBiker) {
      return res.status(403).json({ success: false, msg: "re-auth" });
    }

    const { hashed_password } = dbBiker;

    if (hashed_password !== decode.hashed_password) {
      return res.status(403).json({ success: false, msg: "re-auth" });
    }

    req.body.biker = dbBiker;
    next();
  } catch (err) {
    res.status(403).json({ success: false, msg: "re-auth" });
  }
}
