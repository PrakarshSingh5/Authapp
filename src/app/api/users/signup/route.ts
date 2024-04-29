import {connect} from "@/dbconnect/dbConfig"
import User from '@/models/userModels'
import {NextRequest,NextResponse}  from 'next/server' 
import { sendEmail } from "@/utils/mailer"
import bcryptjs from 'bcryptjs'
connect()

export async function POST(request:NextRequest){
        try{
           const reqBody=  request.json()
           const {username, email,password}=reqBody
           console.log(reqBody);

          const user= await User.findOne({email})
          if(user){
            return NextResponse.json({error:"User aleardy exits"},{status:400})
          }
            const salt =await bcryptjs.genSalt(10);  
            const hashedPassword=await bcryptjs.hash(password,salt)
            const newUser({
                username,
                email,
                password:hashedPassword
            })

           const savedUser= await newUser.save()
           console.log(savedUser);

           //send verification email
            await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
            return NextResponse.json({
                message:"User registered Successfully",
                success:true,
                savedUser
            })

        } catch(error:any){
          return NextResponse.json({error:error.message},
            {status:500}
          );
        
        }
}