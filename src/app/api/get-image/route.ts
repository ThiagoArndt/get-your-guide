import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import mime from "mime-types";
import { db as prisma } from "@db/client";
import { getSession } from "next-auth/react";
import { getCurrentUser } from "@libs/session";
import { RolesEnum } from "@entities/interfaces";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  // Adjust the path to your image file

  let data;
  if (user?.role === RolesEnum.AGENT) {
    data = await prisma.agents.findFirst({ where: { id: user?.id } });
  } else if (user?.role === RolesEnum.USER) {
    data = await prisma.users.findFirst({ where: { id: user?.id } });
  } else {
    return NextResponse.json({}, { status: 401 });
  }
  const base64Image = data?.profile_image.toString("base64");
  // Correct the prefix
  let result;

  // Correct the prefix
  if (base64Image!.startsWith("dataimage/jpegbase64/")) {
    result = base64Image!.replace("dataimage/jpegbase64/", "");
  }
  const response = `data:image/jpeg;base64,/${result}`;
  return NextResponse.json(response ?? null, {
    status: 200,
  });
}
