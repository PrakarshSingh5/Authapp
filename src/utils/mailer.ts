import User from '@/models/userModels';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail=async({email,emailType,userId}:any)=>{
    try{
        const hashedToken= await bcryptjs.hash(userId.toString(),10)
        if(emailType==="VERIFY"){
                        await User.findByIdAndUpdate(userId,
                                {verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000}
                        )
         }else if(emailType==="RESET"){
                await User.findByIdAndUpdate(userId,
                        {forgetPasswordToken:hashedToken,forgetPasswordTokenExpiry:Date.now()+3600000}
                )   
         }
         
         var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "b3cced0907f69d", //⭐
                  pass: "d909c4878fa7b2" //❤️
                }
              });

            const mailOptions={
                    from: 'prakarh.ai', // sender address
                    to: email, // receiver
                    subject: emailType==='VERIFY'?"Verify your email": "Reset your password",
                    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken} ">here</a> to ${emailType==="VERIFY"?"verfiy your email" : "reset your password"} or copy and past the link below in 
                    your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                     </p> `,}
            
            const mailResponse=await transport.sendMail
            (mailOptions)
            return mailResponse

    } catch(error:any){
            throw new Error(error.message)
    }
}