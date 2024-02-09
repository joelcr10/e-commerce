import {Request, Response} from "express";
import bcrypt from 'bcrypt';
import EcSuppliers from "../../models/ec_suppliers";


const changePassword = async (req: Request,res: Response): Promise<Response<any, Record<string,{message: string} | {message: string, newPassword: string}>>> =>{
    try{
        const {email, userType, oldPassword, newPassword} = req.body;
        if(userType=="supplier"){

            const found = await EcSuppliers.findOne({where: {e_mail: email}});

            if(found==null){

                return res.json({message: "user not found"});

            }else{
                if(bcrypt.compareSync(oldPassword,found.password)){
                    const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
                    found.password = hashedPassword;
                    await found.save();
                    return res.json({message: "password changed", newPassword: newPassword});
                }else{
                    return res.json({message: "password doesn't match"});
                }
                
            }
        }else{
            return res.json({message: "user type not found"});
        }
    }catch(error){
        return res.json({message: error});
    }
}

export default changePassword;