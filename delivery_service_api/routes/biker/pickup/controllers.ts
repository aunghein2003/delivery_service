import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function getPickups(req: Request, res: Response) {
  const biker = req.body.biker;

  const pickups = await prisma.pickup.findMany({
    where: { pickup_by: biker.code },
    include: { orders: true },
  });

  res.status(200).json({ success: true, data: pickups });
}

export async function createPickup(req: Request, res: Response) {
  const biker = req.body.biker;

  const fields = [
    "online_shop_id",
    "name",
    "phone_number",
    "address",
    "township",
    "total_amount",
    "deli_fees",
    "paid",
  ];

  const data: { [key: string]: any } = {};

  for (let i = 0; i < fields.length; i++) {
    if (!req.body[fields[i]]) {
      return res
        .status(400)
        .json({ success: false, msg: `${fields[i]} missing` });
    }

    data[fields[i]] = req.body[fields[i]];
  }

  try {
    await prisma.pickup.create({
      data: {
        picker: { connect: { code: biker.code } },
        paid: data.paid,
        orders: {
          create: {
            online_shop_id: data.online_shop_id,
            name: data.name,
            phone_number: data.phone_number,
            address: data.address,
            township: data.township,
            total_amount: data.total_amount,
            deli_fees: data.deli_fees,
          },
        },
      },
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);

    res.status(500).json({ success: false, msg: "Unknown Error" });
  }
}
