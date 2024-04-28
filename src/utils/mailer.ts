import nodemailer from 'nodemailer'

export const sendEmail=async({email,emailType,userId}:any)=>{
    try{
        //TODO; configure mail for usage
        
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

            const mailOptions={
                    from: 'prakarh.ai', // sender address
                    to: email, // receiver
                    subject: emailType==='VERIFY'?"Verify your email": "Reset your password",
                    html: "<b>Hello world?</b>", 
            }
            const mailResponse=await transporter.sendMail
            (mailOptions)
            return mailResponse

    } catch(error:any){
            throw new Error(error.message)
    }
}