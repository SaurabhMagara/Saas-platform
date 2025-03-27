import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import { prismaClient } from "@/app/lib/db";
const YT_REGEX = new RegExp("https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+"); // youtbe url regex

// validation from zod
const CreateStreamSchema = z.object({
    creatorId : z.string(),
    url : z.string()
});


// route for creating stream
export async function POST(req:NextRequest) {
    try {

        // using custom validations we create
        const data = CreateStreamSchema.parse(await req.json());

        // checking url is youtube url or not
        const isYoutube = YT_REGEX.test(data.url);

        // if url is not youtube yrl then gives error
        if(!isYoutube){
            return NextResponse.json({
                message : "Wrong URL format"
            },{status :411});
        }

        // extracting id from url
        const extractedId = data.url.split("?v=")[1];

        //  creating stream --> prisma client contains all types related to schema
        await prismaClient.stream.create({
           data :{
            userId: data.creatorId,
            url: data.url,
            extractedID :extractedId,
            type : "Youtube"
           }
        });
    } catch (error : any) {
        return NextResponse.json({message : error.message || "Error adding stream.", error}, {status :411});
    }
}