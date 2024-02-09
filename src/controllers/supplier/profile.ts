import {Request, Response} from "express";
import EcSuppliers from "../../models/ec_suppliers.ts";

const supplierProfile = async (req: Request,res: Response) =>{
    try{
        const {registration_id} = req.body;
        const found = await EcSuppliers.findOne({where: {registration_id: registration_id}});

            if(found==null){
                return res.json({message: "Invalid registration id"});
            }else{
                return res.json(found.dataValues);
            }

    }catch(error){
        return res.json({message: "error"});
    }
}


export default supplierProfile;