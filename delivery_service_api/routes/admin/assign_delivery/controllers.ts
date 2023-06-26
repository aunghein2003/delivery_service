import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllDeliveries(req: Request, res: Response) {
  const all_deliveries = await prisma.delivery.findMany({
    include: { pickup: true },
    orderBy: { pickup: { pickup_date: "asc" } },
  });

  res.status(200).json({ success: true, data: all_deliveries });
}

export async function assignDelivery(req: Request, res: Response) {
  const order_id = req.body?.order_id;
  const biker_id = req.body?.biker_id;

  if (!order_id || !biker_id) {
    return res
      .status(400)
      .json({ success: false, msg: "Order id and Biker id missing!" });
  }

  const pickUpExist = await prisma.pickup.findUnique({
    where: { order_id },
  });
  const bikerExist = await prisma.biker.findUnique({
    where: { code: biker_id },
  });

  if (!pickUpExist || !bikerExist) {
    return res
      .status(400)
      .json({ success: false, msg: "Order or Biker does not exist!" });
  }

  const alreadyAssign = await prisma.delivery.findUnique({
    where: { order_id },
  });

  if (alreadyAssign) {
    return res
      .status(400)
      .json({ success: false, msg: "Already assigned order" });
  }

  try {
    await prisma.delivery.create({
      data: {
        biker_id,
        order_id,
      },
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Unknown error" });
  }
}
