import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    const data = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const socialNetwork = await db.link.create({
      data: {
        userId,
        link: data.link,
        icon: data.icon,
        name: data.name,

      },
    });

    return NextResponse.json(socialNetwork);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error creating user",
        error: error
      },
      {status : 500}
  );
  }
}