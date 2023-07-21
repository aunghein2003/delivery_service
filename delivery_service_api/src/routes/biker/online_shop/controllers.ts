import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function getOnlineShops(req: Request, res: Response) {
  const onlineShops = await prisma.online_shop.findMany();

  res.status(200).json({ success: true, data: onlineShops });
}
