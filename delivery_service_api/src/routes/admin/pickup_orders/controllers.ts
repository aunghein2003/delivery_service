import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function getAllOrders(req: Request, res: Response) {
  const orders = await prisma.pickup.findMany({
    include: { orders: true },
  });
  res.status(200).json({ success: true, data: orders });
}
