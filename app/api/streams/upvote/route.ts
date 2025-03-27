import { prismaClient } from "@/app/lib/db";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpvoteSchema = z.object({
    streamId : z.string()
});

export async function POST(req :NextRequest){
    try {

        // getting users data in server from next-auth
        const session = await getSession();
       
        // finding user in db
        const user = await prismaClient.user.findFirst({
            where :{
                email : session?.user?.email ?? ""
            }
        });

        if(!user){
            return NextResponse.json({message : "Unauthenticated."}, {status :403});
        }

        const data = UpvoteSchema.parse(await req.json());
        prismaClient.upvotes.create({
            data :{
                userId :user.id,
                streamId :data.streamId
            }
        });

        
    } catch (error : any) {
        return NextResponse.json({message : error?.message || "Error while upvote", error},{status :411});
    }
}