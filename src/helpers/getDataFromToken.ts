import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request : NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value||"";
        let TOKEN_SECRET = "nextjsyoutube";
        console.log("Inside get data from token")
        const decodedToken:any = jwt.verify(token, TOKEN_SECRET);
        console.log(decodedToken)
        return decodedToken.id;
    } catch (error:any) {
        throw new Error(error.message)
    }
}


// 27-March - 02:47:00