import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function GET(request:Request) {

    const user = await currentUser();
    if(!user){
        redirect("/sign-in")
    }
    
    const {searchParams}= new URL(request.url);
    const paramType = searchParams.get("type");
    const validator =z.enum(["expense","income"]);
    const queryParams = validator.safeParse(paramType)
    if(!queryParams.success){
        return Response.json(queryParams.error)
    }
}