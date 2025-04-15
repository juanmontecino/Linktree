import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, {params}: {params: {id: string}}) {
    try {
        const {id} = params
        const {link} = await req.json()

        if(!id || !link) {
            return NextResponse.json({
                message: "Id and link are required",
            }, {status: 400});
        }

        const updateLink = await db.link.update({
            where: {id},
            data: {
                link : link
            }
        })
        return NextResponse.json(updateLink, {status: 200});

    }catch (error) {
        console.error ("UPDATE_Link", error);
        return NextResponse.json({
            message: "error updating link",
        }, {status: 500});
    }
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
    try {
        const {id} = await params
        if(!id) {
            return NextResponse.json({
                message: "Id is required",
            }, {status: 400});
        }
        const deleteLink = await db.link.delete({
            where: {id},
        })
        
        return NextResponse.json(deleteLink, {status: 200});

    }catch (error) {
        console.error ("DELETE_Link", error);
        return NextResponse.json({
            message: "error deleting link",
        }, {status: 500});
    }
}