import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
connect();
export async function GET(request:NextRequest) {
    try {
        let userId = await getDataFromToken(request);
        console.log("Id : ",userId)
        let user = await User.findOne({_id : userId});
        console.log("data : ",user)
        return NextResponse.json({
            message : "User Found",
            data : user
        })
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
}