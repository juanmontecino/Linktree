import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        const {userId} = getAuth(req)
        
        if(!userId) {
            return NextResponse.json({
                message: "Unauthorized",
            }, {status: 401});
        }

        const data = await req.json()

        const updateUser = await db.user.update({
            where: {
                id: userId
            },
            data: data
        })
        return NextResponse.json(updateUser);

    }catch (error) {
        console.error ("UPDATE_USER", error);
        return NextResponse.json({
            message: "error updating user",
        }, {status: 500});
    }
}