import { NextRequest, NextResponse } from "next/server";

export async function POST(req :NextRequest){
    try {
        
    } catch (error : any) {
        return NextResponse.json({
            message : error?.message || "Error while downvote",
            error : error
        },{status :411});
    }
}