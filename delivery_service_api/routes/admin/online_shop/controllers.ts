import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

//  GET /admin/online_shop
export async function getOnlineShops(req: Request, res: Response) {
  const online_shops = await prisma.online_shop.findMany();

  res.status(200).json({ success: true, data: online_shops });
}

//  POST /admin/online_shop
export async function createOnlineShop(req: Request, res: Response) {
  const { name, phone_number, address, township } = req.body;

  if (!name || !phone_number || !address || !township) {
    return res
      .status(400)
      .json({ success: false, msg: "Required fields are missing" });
  }

  const sameOnlineShop = await prisma.online_shop.findFirst({
    where: { AND: { name, phone_number, address, township } },
  });

  if (sameOnlineShop) {
    return res
      .status(400)
      .json({ success: false, msg: "Same Onlineshop already exists" });
  }

  try {
    await prisma.online_shop.create({
      data: {
        name,
        phone_number,
        address,
        township,
      },
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Unknown Error" });
  }
}

//  PATCH /admin/online_shop/:id
export async function updateOnlineShop(req: Request, res: Response) {
  const { id } = req.params;

  const onlineShopExists = await prisma.online_shop.findUnique({
    where: { id: Number(id) },
  });

  if (!onlineShopExists) {
    return res
      .status(400)
      .json({ success: false, msg: "OnlineShop does not exist!" });
  }

  const fields = ["name", "phone_number", "address", "township"];
  const data: { [key: string]: any } = {};

  for (let field in req.body) {
    if (!fields.includes(field)) continue;

    data[field] = req.body[field];
  }

  try {
    await prisma.online_shop.update({ data, where: { id: Number(id) } });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Unknown Error" });
  }
}
