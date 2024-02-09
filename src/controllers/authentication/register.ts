import {Request, Response} from "express";
import EcSuppliers from "../../models/ec_suppliers.ts";


const supplierRegistration = async (req: Request,res: Response): Promise<Response<any,Record<string,{message: string}>>> =>{
    try{
        const {full_name, e_mail, password, profile_pic="sdasdasd"} = req.body;

        if(!full_name){
            return res.status(422).json({message: "full name not found"});
        }
        if(!e_mail){
            return res.status(422).json({message: "email not found"});
        }if(!password){
            return res.status(422).json({message: "password not found"});
        }

        const newSupplier = await EcSuppliers.create({
            full_name: full_name,
            e_mail: e_mail,
            password: password,
            profile_pic: profile_pic
        });
      
        return res.status(200).json({message: `new supplier created: ${newSupplier.registration_id}`});

    }catch(error){
        console.log(error);
        return res.status(500).json({message: error});
    }
    

}


export default supplierRegistration;