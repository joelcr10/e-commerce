import express,{Router, Request, Response} from "express";
import supplierProfile from "../controllers/supplier/profile";

const router = Router();




router.get('/profile', async(req: Request,res: Response) =>{
    await supplierProfile(req,res);
})

export default router;