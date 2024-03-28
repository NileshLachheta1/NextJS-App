import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        //    check if user exists
        let user = await User.findOne({ email });
        console.log("user exist : ")
        if (!user) {
            return NextResponse.json(
                { error: "User does not exists" },
                { status: 400 }
            );
        }


        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid Password" },
                { status: 400 }
            );
        }
        console.log("valid password");

        //   create token data
        const tokendata = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        console.log("TokenData : ",tokendata)
        let TOKEN_SECRET = "nextjsyoutube";

        // create token
        const token = await jwt.sign(tokendata, TOKEN_SECRET, { expiresIn: "1d" });
        console.log("Token : ");
        console.log(token);
        const response = NextResponse.json({ message: "Login successfull", success: true })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}