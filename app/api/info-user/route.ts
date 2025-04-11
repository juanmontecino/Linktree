import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const {userId} = getAuth(req)

        if(!userId) {
            return NextResponse.json({
                message: "Unauthorized",
            }, {status: 401});
        }

        let existingUser = await db.user.findUnique({
            where: {
                id: userId
            },
            include: { links: true }
        });

        if(!existingUser) {
            existingUser = await db.user.create({
                data: {
                    id: userId,
                    name: "Your name",
                    username: `user_${Date.now()}`,
                    links: {
                        create: []
                    }
                },
                include: { links: true }
            });
        }
        return NextResponse.json(existingUser);

    } catch (error) {
        console.error ("GET_USER_FIRST_LOGIN", error);
        return NextResponse.json({
            message: "error fettching user",
        }, {status: 500});
        
    }
}