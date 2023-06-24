import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

//  GET /admin/biker
export async function getBikers(req: Request, res: Response) {
  const bikers = await prisma.biker.findMany();

  res.status(200).json({ success: true, data: bikers });
}

//  POST /admin/biker
export async function createBiker(req: Request, res: Response) {
  const { code, name, phone_number, password } = req.body;

  if (!code || !name || !phone_number || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Required fields are missing!" });
  }

  const userExists = await prisma.biker.findUnique({ where: { code } });

  if (userExists) {
    return res
      .status(400)
      .json({ success: false, msg: "Biker's code already exists!" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashed_password = bcrypt.hashSync(password, salt);

  try {
    await prisma.biker.create({
      data: {
        code,
        name,
        phone_number,
        hashed_password,
      },
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: "Unknown Error" });
  }
}

//  PATCH /admin/biker/:id
export async function updateBiker(req: Request, res: Response) {
  const code = req.params.id;

  const bikerExists = await prisma.biker.findUnique({ where: { code } });

  if (!bikerExists) {
    return res
      .status(400)
      .json({ success: false, msg: "Biker does not exist!" });
  }

  const fields = ["name", "phone_number"];
  const data: { [key: string]: any } = {};

  for (let field in req.body) {
    if (!fields.includes(field)) continue;

    data[field] = req.body[field];
  }

  try {
    await prisma.biker.update({ data, where: { code } });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Unknown Error" });
  }
}

//  DELETE /admin/biker/:id
export async function deleteBiker(req: Request, res: Response) {
  const code = req.params.id;

  const bikerExists = await prisma.biker.findUnique({ where: { code } });

  if (!bikerExists) {
    return res
      .status(400)
      .json({ success: false, msg: "Biker does not exist!" });
  }

  try {
    await prisma.biker.delete({ where: { code } });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Unknown Error" });
  }
}
