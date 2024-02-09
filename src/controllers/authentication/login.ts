import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {Request, Response} from 'express';

import EcSuppliers from "../../models/ec_suppliers.ts";

const login = async (req: Request,res: Response): 
    Promise<
        Response<
        any, Record<
            string, 
            | {message: string}
            | {message:string, token: string}
         >
        >
    > => {
    try{
        const {email, password, userType} = req.body;
        
        if(!password){
            return res.status(422).json({message: "password not found"});
        }
        if(!email){
            return res.status(422).json({message: "email not found"});
        }

        if(userType=="supplier"){
            const found = await EcSuppliers.findOne({where: {e_mail: email}});
            console.log(found?.password);
            if(found==null){
                return res.status(200).json({message: "Invalid username or password"});
            }else{
                if(bcrypt.compareSync(password, found.password)){
                    const token = jwt.sign({
                        user_reg_id: found?.registration_id,
                        userType,
            
                    }, "your_secret",{
                        expiresIn: "24h"
                    });
                    return res.status(200).json({message: `login successfull`, token: token});
                }else{
                    return res.json({message: "invalid password"});
                }
                
            }
        }else{
            return res.status(200).json({message: "no such role exists"});
        }
    }catch(error){
        console.log(error);
        return res.status(401).json({message: error});
    }
}


export default login;