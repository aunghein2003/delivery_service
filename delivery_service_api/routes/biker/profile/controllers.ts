import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function updateProfile(req: Request, res: Response) {
  const { id } = req.params;

  const bikerExist = await prisma.biker.findUnique({ where: { code: id } });

  if (!bikerExist) {
    return res
      .status(400)
      .json({ success: false, msg: "Biker does not exist" });
  }

  const name = req.body?.name;
  const phone_number = req.body?.phone_number;

  if (!name && !phone_number) {
    return res
      .status(400)
      .json({ success: false, msg: "Provide name or phone_number to change" });
  }

  try {
    await prisma.biker.update({
      data: { name, phone_number },
      where: { code: id },
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Unknown Error" });
  }
}

export async function changePassword(req: Request, res: Response) {
  const { id } = req.params;
  const old_password = req.body?.old_password;
  const new_password = req.body?.new_password;

  const bikerExist = await prisma.biker.findUnique({ where: { code: id } });

  if (!bikerExist) {
    return res
      .status(400)
      .json({ success: false, msg: "Biker does not exist" });
  }

  if (!old_password || !new_password) {
    return res
      .status(400)
      .json({ success: false, msg: "Old and New Password missing" });
  }

  const valid = await bcrypt.compare(old_password, bikerExist.hashed_password);

  if (!valid) {
    return res
      .status(400)
      .json({ success: false, msg: "Old password does not match" });
  }

  const salt = bcrypt.genSaltSync(10);
  const new_password_hash = bcrypt.hashSync(new_password, salt);

  try {
    const updateBiker = await prisma.biker.update({
      data: { hashed_password: new_password_hash, change_password: true },
      where: { code: id },
    });

    const { code, hashed_password } = updateBiker;
    let token = jwt.sign(
      { code, hashed_password },
      process.env.ACCESS_TOKEN_SECRET!
    );

    res.status(200).json({ success: false, accessToken: token });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Unknown Error" });
  }
}
