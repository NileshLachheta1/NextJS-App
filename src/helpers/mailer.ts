import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hashed Token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType == "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                })
        }
        else if (emailType == "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                })
        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "25b81cd35cfe37",
                pass: "bd91bc8d21c70e"
            }
        });

        const mailOptions = {
            from: "nileshblachheta@gmail.com",
            to: email,
            Subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `<p>Click <a href="http://localhost:3000/verifyemail?token=${hashedToken}">here</a>to 
            ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}
            or copy and paste the linl below in the browser.</br>
            http://localhost:3000/verifyemail?token=${hashedToken}</p>`
        }

        const response = await transporter.sendMail(mailOptions);

    } catch (error: any) {
        throw new Error(error.message);
    }
}

